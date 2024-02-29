

"use client"
import axios from "axios";
import Joi from "joi";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AddReview() {
    const formRef = useRef(null);
    let [review, setReview] = useState({
        body: ''
    });
    let getInputValue = (event) => {
        let myReview = { ...review };
        myReview[event?.target?.name] = event?.target?.value;
        setReview(myReview);
    }
    let sendReviewDataToApi = async () => {
        await axios.post(`http://127.0.0.1:8000/api/reviews`, review).then((res) => {
            toast.success(res?.data?.message);
            formRef.current.reset()
        }).catch((errors) => {
            const errorList = errors?.response?.data?.message;
            try {
                if (errorList !== undefined) {
                    Object.keys(errorList)?.map((err) => {
                        errorList[err]?.map((err) => {
                            toast.error(err)
                        })
                    });
                } else {
                    toast.error('Something went wrong.')
                }
            } catch (error) {
                toast.error('Something went wrong.')
            }

        })
    }
    let validateReviewForm = () => {
        const schema = Joi.object({
            body: Joi.string().required(),
        });
        return schema.validate(review, { abortEarly: false });
    };
    let submitReviewForm = async (e) => {
        e.preventDefault();
        let validation = validateReviewForm();
        if (!validation?.error) {
            sendReviewDataToApi();
            setReview({ body: '' });

        } else {
            try {
                validation?.error?.details?.map((err) => {
                    toast.error(err.message);
                })
            } catch (e) {
                toast.error('Something went wrong.')
            }
        }
    }
    return (
        <>
            <form ref={formRef} onSubmit={submitReviewForm}>
                <div>
                    <label htmlFor="body"
                        className="block text-sm font-semibold text-gray-800"
                    >Review</label>
                    <textarea
                        name="body"
                        type="text"
                        onChange={getInputValue}
                        className="px-4 w-full py-2 my-1 text-gray-700 bg-white border rounded-md  focus:outline-none"
                        placeholder="enter review..."
                    />
                </div>
                <button type='submit' className="w-full py-2  text-white  bg-gray-600 rounded-md ">Add Review</button>
            </form>
        </>
    )
}

