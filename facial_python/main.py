import json
import os
import time

import face_recognition
import cv2
import numpy as np
import mysql.connector as mc
import uuid
import os.path
from datetime import datetime

PROCESS_EVERY_FRAMES = 5
PROCESS_QUALITY = 1


def add_video_to_db(path):
    global people
    global cropped_faces
    global thumbnail

    # create row in Video DB
    try:
        q = "INSERT INTO Video(file_path, size) VALUES(%s, %s)"
        rs.execute(q, (path, 5))
        con.commit()
    except Exception as e:
        print(str(e) + " SQL ERROR")

    pathstr = "./thumbnails" + str(path)[8: len(path) - 4] + "png"
    # set thumbnail

    try:
        cv2.imwrite(pathstr, thumbnail)
    except Exception as e:
        print(e)
    # create local spaces for faces
    # mkdir if needed
    for person in people:
        confirmed = 1

        person_path = "./faces/" + str(person)
        if not os.path.exists(person_path):
            os.mkdir(person_path)
            confirmed = 0

        # save copy of face
        file_name = str(uuid.uuid4()) + ".png"
        try:

            cv2.imwrite(person_path + "/" + file_name, cropped_faces[person])
        except Exception as e:
            print(e)

        # add person to db
        q = "INSERT INTO Face(face_path, f_name, confirmed) VALUES (%s, %s, %s)"

        try:
            rs.execute(q, (person_path, person, confirmed))
            con.commit()
        except Exception as e:
            print(e)

        # add to VideoPeople array
        try:
            q = "INSERT INTO VideoPeople(v_path, f_path) VALUES (%s, %s)"
            rs.execute(q, (path, person_path))
            con.commit()
        except Exception as e:
            pass

    people = []  # reset array
    cropped_faces = {}


config = None
try:
    f = open('../config.json')
    config = json.load(f)
    print("Config file loaded for user " + config["user"])
except FileNotFoundError:
    print("No Config File Found!")
    exit(1)
except Exception as e:
    print(e)
    exit(1)

usr = config['user']
pwd = config['pass']
hst = config['host']
dab = 'hack'
# create a connection
con = mc.connect(user=usr, password=pwd, host=hst, database=dab)
# create a result set
rs = con.cursor()

print("Database Connection Successful!")

# Get a reference to webcam #0 (the default one)
video_capture = cv2.VideoCapture(0)

face_dirs = os.listdir("./faces")

known_face_encodings = []
known_face_names = []

thumbnail = None

for dir in face_dirs:
    for image_path in os.listdir("./faces/" + dir):
        image = face_recognition.load_image_file("./faces/" + dir + "/" + image_path)
        try:
            face_encoding = face_recognition.face_encodings(image)[0]
        except:
            pass
        known_face_encodings.append(face_encoding)
        known_face_names.append(dir)

# Create arrays of known face encodings and their names


# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = 0

vid_cod = cv2.VideoWriter_fourcc(*'VP80')
output = None
video_started = False
path = None


max_frames = 60 # specifies max video length
current_frames = 0

# vars used for recording frames after off screen
max_stop_lag = 60
current_lag = 0

# holds detected people per clip

people = []
cropped_faces = {}


def setup_video():
    global video_started
    video_started = False


def add_frame_to_output(target_frame):
    global video_started
    global output
    global vid_cod
    global path

    if not video_started:
        path = "./videos/" + str(uuid.uuid4()) + ".webm"
        print("Setting up for " + path)
        try:
            output = cv2.VideoWriter(path, vid_cod, 20.0, (1280, 720))
        except Exception as e:
            print("Loading anyways")
        video_started = True

    output.write(target_frame)


setup_video()


def end_video():
    global video_started
    output.release()
    add_video_to_db(path)
    print("finished clip")
    video_started = False
    setup_video()
    current_lag = 0
    return current_lag


while True:

    now = datetime.now()

    if now.second == 0 or now.second == 30:
        f = open("status.json", 'w')
        x = '{      "status": "OK", "time": { "year":' \
            + str(now.year) + ', "month":  ' \
            + str(now.month) + ', "day":'\
            + str(now.day) +', "hour": '\
            + str(now.hour)  + ', "minute": '\
            + str(now.minute) + '}    }'
        f.write(x)
        print("Wrote")

    if current_frames >= max_frames:
        print("No face detected for max time \nEnding video...")
        current_lag = end_video()
        current_frames = 0
    else:
        current_frames = current_frames + 1


    # Grab a single frame of video
    ret, frame = video_capture.read()



    # Only process every third frame of video to save time
    if process_this_frame == 0:
        thumbnail = frame
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=PROCESS_QUALITY, fy=PROCESS_QUALITY)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []




        if len(face_encodings) == 0 and video_started:
            if current_lag < max_stop_lag:
                add_frame_to_output(frame)
                current_lag = current_lag + 1
            else:
                print("Max video length reached\nEnding video...")
                current_lag = end_video()

        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            name = "Unknown"

            # # If a match was found in known_face_encodings, just use the first one.
            # if True in matches:
            #     first_match_index = matches.index(True)
            #     name = known_face_names[first_match_index]

            # Or instead, use the known face with the smallest distance to the new face
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = None
            if len(matches) != 0:
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]
                    add_frame_to_output(frame)

                else:
                    add_frame_to_output(frame)
            else:
                add_frame_to_output(frame)

            face_names.append(name)

        for (top, right, bottom, left), name in zip(face_locations, face_names):

            if name not in cropped_faces:
                top -=  1
                right += 1
                left -= 1
                bottom += 1
                cropped = frame[top:bottom, left:right]
                if name == 'Unknown':
                    name = str(uuid.uuid4())
                    people.append(name)
                else:
                    people.append(name)

                try:
                    cropped_faces[name] = cropped
                except:
                    pass
                print("added " + name)

                try:
                    cv2.imwrite("tmp.jpg", cropped)
                except:
                    pass
                image = face_recognition.load_image_file("tmp.jpg")
                try:
                    facial_encoding = face_recognition.face_encodings(image)[0]
                except:
                    pass
                known_face_encodings.append(facial_encoding)
                known_face_names.append(name)

            else:
                pass
    else:
        if video_started:
            output.write(frame)

    process_this_frame = (process_this_frame +1)%PROCESS_EVERY_FRAMES


    if os.path.isfile("lock.lck"):
        break


# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()
