import {create} from "zustand"; 

const usePostsStore = create((set) => ({
    posts: [],
    createPost: (post) => set(state => ({posts:[post, ...state.posts]}))
    //TO ADD:
    //delete post
    //addComment
    //setPosts
    //editComment
}))

export default usePostsStore