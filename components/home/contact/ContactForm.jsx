export default function Form() {
  return (
    <form action="" className="h-full w-full p-15 flex flex-col gap-2">
      <div className="">
        <label
          htmlFor="firstname"
          className="w-full text-gray-500 font-medium text-sm"
        >
          Firstname <span className="text-red-800">*</span>
        </label>
        <input
          type="text"
          name="firstname"
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
          htmlFor="phone"
          className="w-full text-gray-500 font-medium text-sm"
        >
          Phone number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="w-full my-3 border-2 border-gray-300 outline-gray-300 p-2"
          placeholder="E.g 252 63-4344323"
          autoComplete="off"
          required
        />
      </div>

      <div className="">
        <label
          htmlFor="message"
          className="w-full text-gray-500 font-medium text-sm"
        >
          Message
        </label>
        <textarea
          name="message"
          id="message"
          className="w-full my-3 border-2 border-gray-300 outline-gray-300 p-2 h-40"
          placeholder="Type your message here..."
          autoComplete="off"
          required
        ></textarea>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-950 text-white text-lg font-light w-46 h-13 rounded-4xl"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
