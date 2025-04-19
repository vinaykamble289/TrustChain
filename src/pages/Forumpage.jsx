// import React, { useState } from "react";
// import { ThumbsUp, ThumbsDown, MessageCircle, Send } from "lucide-react";

// const ForumPost = () => {
//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   const handleLike = () => setLikes((prev) => prev + 1);
//   const handleDislike = () => setDislikes((prev) => prev + 1);

//   const addComment = () => {
//     if (newComment.trim()) {
//       setComments([
//         ...comments,
//         { text: newComment, likes: 0, replies: [] },
//       ]);
//       setNewComment("");
//     }
//   };

//   const handleCommentLike = (idx) => {
//     const updated = [...comments];
//     updated[idx].likes += 1;
//     setComments(updated);
//   };

//   const handleReply = (idx, replyText) => {
//     if (replyText.trim()) {
//       const updated = [...comments];
//       updated[idx].replies.push({ text: replyText });
//       setComments(updated);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
//       <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-800">
//             How does Blockchain help in academic verification?
//           </h2>
//           <p className="text-gray-600 mt-2">
//             I’m building a decentralized verification system. How do I ensure it’s secure and scalable?
//           </p>

//           <div className="flex gap-4 items-center mt-4">
//             <button
//               onClick={handleLike}
//               className="flex items-center gap-1 text-blue-600 hover:scale-105 transition"
//             >
//               <ThumbsUp className="w-5 h-5" /> {likes}
//             </button>
//             <button
//               onClick={handleDislike}
//               className="flex items-center gap-1 text-red-500 hover:scale-105 transition"
//             >
//               <ThumbsDown className="w-5 h-5" /> {dislikes}
//             </button>
//           </div>
//         </div>

//         <div className="border-t pt-4">
//           <h3 className="text-lg font-bold text-gray-700 mb-2">Comments</h3>
//           <div className="space-y-4">
//             {comments.map((comment, idx) => (
//               <div key={idx} className="bg-gray-50 rounded-lg p-4 space-y-2">
//                 <div className="flex justify-between items-center">
//                   <p>{comment.text}</p>
//                   <button
//                     onClick={() => handleCommentLike(idx)}
//                     className="flex items-center text-sm text-blue-500 hover:text-blue-700"
//                   >
//                     <ThumbsUp className="w-4 h-4 mr-1" /> {comment.likes}
//                   </button>
//                 </div>
//                 <ReplySection
//                   comment={comment}
//                   idx={idx}
//                   handleReply={handleReply}
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 flex gap-2">
//             <input
//               type="text"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Write a comment..."
//               className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
//             />
//             <button
//               onClick={addComment}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-1"
//             >
//               <MessageCircle className="w-4 h-4" /> Comment
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ReplySection = ({ comment, idx, handleReply }) => {
//   const [reply, setReply] = useState("");

//   return (
//     <div className="ml-4">
//       {comment.replies.map((r, i) => (
//         <div key={i} className="text-sm text-gray-700 mt-2 border-l-2 border-gray-300 pl-3">
//           ↪ {r.text}
//         </div>
//       ))}
//       <div className="flex mt-2 gap-2">
//         <input
//           type="text"
//           value={reply}
//           onChange={(e) => setReply(e.target.value)}
//           placeholder="Reply to this comment..."
//           className="flex-1 px-3 py-1 border rounded-lg text-sm shadow-sm"
//         />
//         <button
//           onClick={() => {
//             handleReply(idx, reply);
//             setReply("");
//           }}
//           className="text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md flex items-center"
//         >
//           <Send className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ForumPost;

import React, { useState, useEffect } from "react";
import { ThumbsUp, MessageCircle, Send } from "lucide-react";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  onSnapshot
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase/config";

const auth = getAuth();

const createPost = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.error("User not logged in");
    return;
  }

  try {
    await addDoc(collection(db, "posts"), {
      title: "Test Post",
      content: "This is a sample post",
      author: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Anonymous",
      },
      createdAt: serverTimestamp(),
    });
    console.log("Post created successfully");
  } catch (error) {
    console.error("Error creating post:", error.message);
  }
};
const ForumPost = ({ postId = "defaultPost" }) => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    likes: 0,
    comments: []
  });
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postRef = doc(db, "forumPosts", postId);

    const unsubscribe = onSnapshot(postRef, async (docSnap) => {
      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        // Create the post if it doesn't exist
        try {
          await setDoc(postRef, {
            title: "How does Blockchain help in academic verification?",
            content: "I'm building a decentralized verification system. How do I ensure it's secure and scalable?",
            likes: 0,
            comments: []
          });
        } catch (error) {
          console.error("🔥 Error creating default post:", error.message);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleLike = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to like the post.");
      return;
    }

    try {
      const postRef = doc(db, "forumPosts", postId);
      await updateDoc(postRef, {
        likes: post.likes + 1
      });
    } catch (error) {
      console.error("🔥 Error updating likes:", error.message);
    }
  };

  const addComment = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to comment.");
      return;
    }

    if (!newComment.trim()) return;

    try {
      const postRef = doc(db, "forumPosts", postId);
      await updateDoc(postRef, {
        comments: arrayUnion({
          text: newComment,
          likes: 0,
          replies: [],
          createdAt: new Date().toISOString()
        })
      });
      setNewComment("");
    } catch (error) {
      console.error("🔥 Error adding comment:", error.message);
    }
  };

  const handleCommentLike = async (commentIndex) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to like a comment.");
      return;
    }

    try {
      const postRef = doc(db, "forumPosts", postId);
      const updatedComments = [...post.comments];
      updatedComments[commentIndex].likes += 1;

      await updateDoc(postRef, {
        comments: updatedComments
      });
    } catch (error) {
      console.error("🔥 Error liking comment:", error.message);
    }
  };

  const handleReply = async (commentIndex, replyText) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to reply.");
      return;
    }

    if (!replyText.trim()) return;

    try {
      const postRef = doc(db, "forumPosts", postId);
      const updatedComments = [...post.comments];
      updatedComments[commentIndex].replies.push({
        text: replyText,
        createdAt: new Date().toISOString()
      });

      await updateDoc(postRef, {
        comments: updatedComments
      });
    } catch (error) {
      console.error("🔥 Error replying to comment:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse text-gray-600">Loading forum post...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Post Header */}
        <div className="bg-blue-800 text-white p-6">
          <h1 className="text-2xl font-bold">Blockchain Forum</h1>
        </div>

        {/* Main Post Content */}
        <div className="p-6 space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.content}</p>

            <div className="flex gap-4 items-center mt-4">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition"
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{post.likes} Likes</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              <MessageCircle className="text-blue-600" />
              <span>Comments ({post.comments.length})</span>
            </h3>

            <div className="space-y-4">
              {post.comments.length === 0 ? (
                <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
              ) : (
                post.comments.map((comment, idx) => (
                  <CommentItem
                    key={idx}
                    comment={comment}
                    onLike={() => handleCommentLike(idx)}
                    onReply={(replyText) => handleReply(idx, replyText)}
                  />
                ))
              )}
            </div>

            {/* Add Comment */}
            <div className="mt-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && addComment()}
                />
                <button
                  onClick={addComment}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentItem = ({ comment, onLike, onReply }) => {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3 border border-gray-200">
      <div className="flex justify-between items-start">
        <p className="text-gray-800">{comment.text}</p>
        <button
          onClick={onLike}
          className="flex items-center text-sm text-blue-500 hover:text-blue-700 ml-4"
        >
          <ThumbsUp className="w-4 h-4 mr-1" /> {comment.likes}
        </button>
      </div>

      <div className="text-xs text-gray-500">
        Posted on {new Date(comment.createdAt).toLocaleString()}
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="ml-4 mt-2 space-y-2">
          {comment.replies.map((reply, i) => (
            <div key={i} className="text-sm text-gray-700 pl-3 border-l-2 border-blue-200">
              <div className="flex items-start">
                <span className="text-blue-500 mr-1">↪</span>
                <span>{reply.text}</span>
              </div>
              <div className="text-xs text-gray-500 ml-4">
                {new Date(reply.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Input */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowReply(!showReply)}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          {showReply ? "Cancel" : "Reply"}
        </button>
      </div>

      {showReply && (
        <div className="flex mt-2 gap-2">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 px-3 py-1 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onReply(replyText);
                setReplyText("");
                setShowReply(false);
              }
            }}
          />
          <button
            onClick={() => {
              onReply(replyText);
              setReplyText("");
              setShowReply(false);
            }}
            className="text-sm bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 rounded-md flex items-center transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ForumPost;
