<template>
<section class="container">
  <div class="main-header">
    <h2 class="story-heading">{{ story.title }} &nbsp;</h2><span class="greytext"> {{ story.url }} </span>
    <p class="greytext">Score: {{ story.score }} points | by <span>{{story.by}}</span>
    </p>
  </div>
  <div class="">
    <div v-for="comment in comments" :key="comment.id">
      <div class="comment-wrap">
        <div class="comment-block">
          <p class="comment-text">{{ comment.text }}</p>
          <div class="bottom-comment">
            <div class="comment-author">{{ comment.by }}</div>
            <div class="comment-date">{{ comment.time }}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
</section>
</template>

<script>
export default {
   data(){
       return{
           story: {},
           comments: []
       }
   },
   async created(){
       const response = await fetch('https://hacker-news.firebaseio.com/v0/item/'+this.$route.params.id+'.json');
       const responseData = await response.json();
       if(!response.ok){
           const err = new Error(responseData.message || 'Failed to fetch data');
           throw err
       }
       else{
           this.story = responseData;
           this.story.comments = [];

           for(let i=0; i<this.story.kids.length; i++){
               let commentId = this.story.kids[i];
               const getComment = await fetch('https://hacker-news.firebaseio.com/v0/item/'+commentId+'.json');
               const comment = await getComment.json();
               if(!getComment.ok){
                    const err = new Error(responseData.message || 'Failed to fetch data');
                    throw err
                }
                else{
                    this.comments.push(comment);
                }
           }

       }

   }
    
}
</script>
<style scoped>
.comment-wrap{
  margin-bottom: 1.25rem;
  display: table;
  width: 100%;
  min-height: 5.3125rem;
}
.story-heading{
  display: inline-block;
  margin-bottom: 10px ;
}
.main-header{
  background-color: #fff;
  padding: 2rem;
  margin-top: 0;
  margin-bottom: 10px;
}
.greytext{
  color: grey;
  font-size: 90%;
}
.photo {
  padding-top: 0.625rem;
  display: table-cell;
  width: 3.5rem;
}
.photo .avatar {
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 50%;
  background-size: contain;
}

.comment-block {
  padding: 1rem;
  
  background-color: #fff;
  display: table-cell;
  vertical-align: top;
  border-radius: 0.1875rem;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
}
.comment-block textarea {
  width: 100%;
  resize: none;
}

.comment-text {
  margin-bottom: 1.25rem;
}

.bottom-comment {
  color: #acb4c2;
  font-size: 0.875rem;
}

.comment-date {
  float: left;
}

.comment-actions {
  float: right;
}
.comment-actions li {
  display: inline;
  margin: -2px;
  cursor: pointer;
}
.comment-actions li.complain {
  padding-right: 0.75rem;
  border-right: 1px solid #e1e5eb;
}
.comment-actions li.reply {
  padding-left: 0.75rem;
  padding-right: 0.125rem;
}
.comment-actions li:hover {
  color: #0095ff;
}
</style>