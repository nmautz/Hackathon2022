import json
import face_recognition
import cv2
import numpy as np
import mysql.connector as mc




def add_video_to_db(path):

    try:
        q = "INSERT INTO Video(path, size) VALUES(%s, %s)"
        rs.execute(q, (path, 5))
        con.commit()
    except Exception as e:
        print(e)





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

# Load a sample picture and learn how to recognize it.
obama_image = face_recognition.load_image_file("obama.jpg")
obama_face_encoding = face_recognition.face_encodings(obama_image)[0]

# Load a second sample picture and learn how to recognize it.
biden_image = face_recognition.load_image_file("biden.jpeg")
biden_face_encoding = face_recognition.face_encodings(biden_image)[0]



# Create arrays of known face encodings and their names
known_face_encodings = [
    obama_face_encoding,
    biden_face_encoding,
]
known_face_names = [
    "Nathan Mautz",
    "Nia Hill",
]

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

vid_cod = cv2.VideoWriter_fourcc(*'MJPG')
video_name_index = 0
output = cv2.VideoWriter("./videos/cam_video" + str(video_name_index) + ".avi", vid_cod, 20.0, (1280,720))
video_started = False

# vars used for recording frames after off screen
max_stop_lag = 15
current_lag = 0


def setup_video():
    global video_name_index
    global vid_cod
    global output
    global video_started
    print(str(video_name_index) + " index")
    video_name_index = video_name_index + 1
    output = cv2.VideoWriter("./videos/cam_video" + str(video_name_index) + ".avi", vid_cod, 20.0, (1280, 720))
    add_video_to_db("./videos/cam_video" + str(video_name_index) + ".avi")
    video_started = False


while True:
    # Grab a single frame of video
    ret, frame = video_capture.read()

    # Only process every other frame of video to save time
    if process_this_frame:
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []

        if len(face_encodings) == 0 and video_started:
            if current_lag < max_stop_lag:
                output.write(frame)
                current_lag = current_lag +1
                print("recording lag frame")
            else:
                output.release()
                print("finished clip")
                video_started = False
                setup_video()
                current_lag = 0

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
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
                output.write(frame)
                video_started = True
                print("added frame")

            else:
                output.write(frame)
                video_started = True
                print("added frame")

            face_names.append(name)

    process_this_frame = not process_this_frame



    # Hit 'q' on the keyboard to quit!
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release handle to the webcam
video_capture.release()
cv2.destroyAllWindows()