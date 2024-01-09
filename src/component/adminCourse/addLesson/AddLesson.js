import React,{useState} from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAddLessonMutation } from '../../../services/SignUpApi';

const AddLesson = (props) => {
    const adminCourseId = props.adminCourseId;
    const [videoLink, setVideoLink] = useState("");
    const [addAdminLesson] = useAddLessonMutation();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!videoLink) {
        toast.error("Please fill video link");
  
        return;
      }
      const formData = { videoLink,adminCourseId };
  
      console.log(formData);
      const res = await addAdminLesson(formData);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    };
    return (
        <>
          <header className="flex mb-3 items-center border-b border-slate-100 dark:border-slate-700 pb-2 -mx-6 px-6 mt-5">
                          <div className="flex-1 flex justify-between">
                            <div className="card-title text-slate-900 dark:text-white">
                              {" "}
                              Add Lesson
                            </div>
                           
                          </div>
                        </header>
        <div className="card-text h-full">
          <form className="space-y-4" id="multipleValidation">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="input-area">
                <label htmlFor="video_link" className="form-label">
                  Video Link
                </label>
                <div className="relative">
                  <input
                    style={{ fontSize: "12px" }}
                    id="video_link"
                    type="text"
                    name="video_link"
                    className="form-control"
                    placeholder="Video Link"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              className="btn inline-flex justify-center btn-dark"
              type="button"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
    </> 
    );
}



export default AddLesson;