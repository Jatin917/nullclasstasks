import React, { useEffect, useState } from "react";
import PostCard from "../../Comnponent/Post/PostCard";
import axios from "axios";
import Leftsidebar from "../../Comnponent/Leftsidebar/Leftsidebar";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const PostPage = ({slidein}) => {
  const cardStyles = {
    height: "300px", // Can be adjusted dynamically
    width: "250px", // Can also be dynamic
  };
  // const [posts, setPosts] = useState([]);
  const posts = useSelector((state)=> state.postReducer);
  console.log("updated post", posts);
  return (
    <div className="flex min-h-[calc(100vh-100px)] max-w-[1250px] mx-auto">
        <Leftsidebar slidein={slidein} />

      {/* Main Content Area - scrollable container */}
      <div className="mt-[60px] flex-1 p-4 overflow-auto h-[calc(100vh-100px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div className="h-fit" key={post._id}>
                <PostCard 
                  post={post}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center h-32">
              <p className="text-gray-600">No posts available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
