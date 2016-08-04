import React from "react";

import NewsFeedPost from "../components/NewsFeedPost";
import NewsFeedStore from "../stores/NewsFeedStore";
// import style from '../../sass/newsfeed.scss';


export default class NewsFeed extends React.Component {

	constructor() {
    super();
    this.getNewsFeedPosts = this.getNewsFeedPosts.bind(this);
    this.state = { posts: NewsFeedStore.getAll() };
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
        return <NewsFeedPost key={post.timestamp} {...post}/>;
    });

    return (
      <div>
        <div class="user-post">
          <div>
            <form>
              <textarea class="user-post-text" maxLength="140" rows="4"
                cols="80" type="text" defaultValue=" #SoftwareDemoDay" />
              <div>
                <span class="fb-check"><input type="checkbox" name="facebook" value="facebook"/>Facebook</span>
                <span class="tw-check"><input type="checkbox" name="twitter" value="twitter"/>Twitter</span>
              </div>
            </form>
          </div>
          <div>
            <button class="btn btn-primary">Make a post</button>
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
