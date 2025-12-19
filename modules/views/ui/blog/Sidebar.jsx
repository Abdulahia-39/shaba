"use client";

import { Search, MessageSquare, Clock } from "lucide-react"; // Optional icons
import { useComment } from "@/contexts/CommentContext";

const Sidebar = ({ blogPage = null }) => {
  const { comments } = useComment();

  let filteredComments = [...comments];
  if (blogPage) {
    filteredComments = comments.filter((comment) => comment.post === blogPage);
  }
  return (
    <section className="flex-1 min-h-screen bg-green-200 border-l border-gray-200 hidden md:flex flex-col">
      <div className="p-6">
        <div className="relative group">
          <input
            type="text"
            className="w-full bg-white border border-gray-200 shadow-sm h-11 rounded-xl pl-4 pr-12 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
            placeholder="Search comments..."
          />
          <button className="absolute right-1 top-1 bg-green-600 hover:bg-green-700 text-white px-4 h-9 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Search
          </button>
        </div>
      </div>

      <div className="px-6 pb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-green-600" />
        <h3 className="text-slate-800 font-bold text-lg tracking-tight">
          Latest Activity
        </h3>
      </div>

      {/* 2. Scrollable Comments Area */}
      <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-10 custom-scrollbar">
        {filteredComments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">No comments found yet.</p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-default"
            >
              <div className="flex items-center gap-3 mb-2">
                {/* Avatar Circle */}
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs uppercase">
                  {comment.name?.charAt(0) || "U"}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 leading-none">
                    {comment.name}
                  </span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString()
                      : "Just now"}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                "{comment.comment}"
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Sidebar;
