import React from "react";

import NewsFeedPost from "../components/NewsFeedPost";
import NewsFeedStore from "../stores/NewsFeedStore";
// import style from '../../sass/newsfeed.scss';


export default class NewsFeed extends React.Component {

	constructor() {
    super();
    this.getNewsFeedPosts = this.getNewsFeedPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.twToggle = this.twToggle.bind(this);
    this.fbToggle = this.fbToggle.bind(this);
    this.state = {
      posts: NewsFeedStore.getAll(),
      fbPost: false,
      twPost: false,
      userText: "#SoftwareDemoDay",
    };
  }

  componentWillMount() {
    NewsFeedStore.on("updated", this.getNewsFeedPosts);
    NewsFeedStore.on("error", this.showError);
  }

  componentWillUnmount() {
    NewsFeedStore.removeListener("updated", this.getNewsFeedPosts);
    NewsFeedStore.removeListener("error", this.showError);
  }

  getNewsFeedPosts() {
    this.setState({
      posts: NewsFeedStore.posts
    });
  }

  createPost() {
    let text = document.getElementsByClassName(
      "user-post-form")[0].getElementsByTagName('textarea')[0].value;
    NewsFeedStore.createPost(text, this.state.fbPost, this.state.twPost);

    console.log(text);
  }

  showError(){
    console.log(EventStore.error);
  }

  fbToggle() {
    this.setState({
      fbPost: !this.state.fbPost,
    })
  }

  twToggle() {
    this.setState({
      twPost: !this.state.twPost,
    });
  }


  render() {
    console.log(this.state.fbPost);
    console.log(this.state.twPost);
    const { posts } = this.state;

    const NewsFeedPosts = posts.map((post) => {
        console.log(post)
        return <NewsFeedPost key={post.timestamp} {...post}/>;
    });

    return (
      <div>
        <div class="user-post">
          <div>
            <form class="user-post-form">
              <textarea maxLength="140" rows="4" cols="80" type="text"
                defaultValue={this.state.userText}></textarea>
              <div>
                <span class="fb-check"><input type="checkbox"
                  onChange={this.fbToggle}/>Facebook</span>
                <span class="tw-check"><input type="checkbox"
                  onChange={this.twToggle}/>Twitter</span>

                <button class="submit-form btn btn-primary" onClick={this.createPost}>Make a post</button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="news-feed-posts">
            {NewsFeedPosts}
          </div>
        </div>
      </div>
    );
  }
}
