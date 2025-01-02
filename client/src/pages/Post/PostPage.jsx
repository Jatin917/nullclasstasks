import React, { useEffect, useState } from "react";
import PostCard from "../../Comnponent/Post/PostCard";
import axios from "axios";
import Leftsidebar from "../../Comnponent/Leftsidebar/Leftsidebar";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { translator } from "../../action/translator";

const PostPage = ({slidein}) => {
  const posts = useSelector((state)=> state.translatedPostDataReducer);  
  console.log("updated post", posts);
  return (
    <div className="flex min-h-[calc(100vh-100px)] max-w-[1250px] mx-auto">
      <Leftsidebar slidein={slidein} />

      {/* Main Content Area */}
      <div className="mt-[60px] flex-1 p-4 overflow-auto h-[calc(100vh-100px)]">
        {/* Single Column Layout for StackOverflow-style cards */}
        <div className="max-w-3xl mx-auto space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id}>
                <PostCard post={post} />
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-32 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-600">No posts available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
