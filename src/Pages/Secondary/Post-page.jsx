



const PostPage = () => {
     
    return (
        <div className="post-page">
         
                <div className="post-container">
                    <div className="post-header">
                        <h2>Post title</h2>
                        <p>Posted by Post author on time</p>
                    </div>
                    <div className="post-content">
                        <p>post contetn</p>
                    </div>
                    <div className="comments-container">
                        <h3>Comments</h3>
                        <div className="comment-list">
                            some comments 
                        </div>
                    </div>
                    <form  className="comment-form">
                        <textarea
                            value=''
                            onChange={console.log('hi')}
                            placeholder="Add a comment..."
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            
        </div>
    )
}

export default PostPage;