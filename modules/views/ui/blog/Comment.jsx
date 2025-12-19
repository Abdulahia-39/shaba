import { useComment } from "@/contexts/CommentContext";
import SubmitButton from "../home/contact/SubmitButton";

export default function Comment({ postId }) {
  const { postComment, success, error } = useComment();

  return (
    <div className="sm:w-[80%] mx-auto mt-10">
      <div className="my-2 px-5">
        <h3 className="font-semibold">Leave a comment</h3>
      </div>
      <form
        action={postComment}
        className="h-full w-full p-5 flex flex-col gap-2"
      >
        <div className="">
          <label
            htmlFor="firstname"
            className="w-full text-gray-500 font-medium text-sm"
          >
            Name <span className="text-red-800">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="firstname"
            className="w-full my-3 border-2 border-gray-300 outline-gray-300 p-2"
            placeholder="E.g abdulahi"
            autoComplete="off"
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="email"
            className="w-full text-gray-500 font-medium text-sm"
          >
            Email <span className="text-red-800">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full my-3 border-2 border-gray-300 outline-gray-300 p-2"
            placeholder="E.g example@email.com"
            autoComplete="off"
            required
          />
        </div>

        <div className="">
          <label
            htmlFor="comment"
            className="w-full text-gray-500 font-medium text-sm"
          >
            Comment <span className="text-red-800">*</span>
          </label>
          <textarea
            name="comment"
            id="comment"
            className="w-full my-3 border-2 border-gray-300 outline-gray-300 p-2 h-40"
            placeholder="Type your message here..."
            autoComplete="off"
            required
          ></textarea>
        </div>

        <input type="hidden" name="postId" value={postId} />

        <div className="flex justify-end">
          <SubmitButton label="comment" />
        </div>
        {success && (
          <p className="text-green-600 transition-opacity duration-500">
            Comment submitted!
          </p>
        )}
        {error && (
          <p className="text-red-600 transition-opacity duration-500">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
