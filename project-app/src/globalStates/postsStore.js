import {create} from "zustand"; 

const usePostsStore = create((set) => ({
    posts: [], //The posts array
    likedPosts: [], //The liked posts

    createPost: (post) => set(state => ({posts:[post, ...state.posts]})), //When we create a new post we add it to the posts array and keeps all the prev posts
    setPosts: (posts)=> set({posts}),    //We set the posts with the input "posts"
    deletePost: (postID) => set(state => ({ // Action to delete a post by its ID
        posts: state.posts.filter(post => post.id !== postID)
    })),
    addComment: (postID, comment) => set(state => ({ // Add a comment to a specific post (postID)
        posts: state.posts.map(post => {
            if (post.id === postID) {
                return {...post,comments: [...post.comments, comment]}; //adds the comment to the correct post
            }
            return post;
        })
    })),
    setLikes: (postID, userID) => set(state => ({ // Set likes for a specific post (postID)
        posts: state.posts.map(post => {
            if (post.id === postID) {
                const isLiked = post.likes.includes(userID);
                const updatedLikes = isLiked
                    ? post.likes.filter(id => id !== userID) // Remove user ID from likes array
                    : [...post.likes, userID]; // Add user ID to likes array
                return { ...post, likes: updatedLikes }; // Updates the likes array for the correct post
            }
            return post;
        })
    })),
    setLikedPosts: (likedPosts) => set({ likedPosts }), // Set the liked posts array
    //TO ADD:
    //editComment
}))

export default usePostsStore