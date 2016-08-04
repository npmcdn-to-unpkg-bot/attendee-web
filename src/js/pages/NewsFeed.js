import React from "react";

import NewsFeedPost from "../components/NewsFeedPost";
import NewsFeedStore from "../stores/NewsFeedStore";
// import style from '../../sass/newsfeed.scss';


export default class NewsFeed extends React.Component {

	constructor() {
    super();
    this.getNewsFeedPosts = this.getNewsFeedPosts.bind(this);
    this.feed = NewsFeedStore.getAll();
    this.state = { posts: this.feed };
  }

  componentWillMount() {
    NewsFeedStore.on("received", this.getNewsFeedPosts);
    NewsFeedStore.on("error", this.showError);
  }

  componentWillUnmount() {
    NewsFeedStore.removeListener("received", this.getNewsFeedPosts);
    NewsFeedStore.removeListener("error", this.showError);
  }

  getNewsFeedPosts() {
    this.setState({
      posts: NewsFeedStore.posts
    });
  }

  showError(){
    console.log(EventStore.error);
  }


  render() {
    console.log(this.state);
    const { posts } = this.state;

    const NewsFeedPosts = posts.map((post) => {
        return <NewsFeedPost key={post.id} {...post}/>;
    });

    return (
      <div>
        <div>
          <h1>News Feed</h1>
        </div>
        <div>
          <button className="btn btn-primary">Make a post</button>
          <h1>THIS IS A THING</h1>
          <div className="news-feed-posts">
            {NewsFeedPosts}
          </div>
        </div>
      </div>
    );
  }
}
