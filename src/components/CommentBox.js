import React from "react";
import AddComment from './AddComment';
import CommentList from './CommentList';

export class CommentBox extends React.Component{

  render(){
    var routeParams = {};
    routeParams.category = this.props.page;
    routeParams.modelname = this.props.pageId;
    return(
      <div className="col-sm-12 col-md-12 col-lg-12 px-0 bg-white">
        <div className=" rounded pb-4 bg-white">
           {/*<ul className="text-info">
            { this.props.comments &&  this.props.comments.map( (comment, key) =>
              <li key={comment.id}>{comment.name}</li>)
            }
            </ul>*/}

            <CommentList
            page={this.props.page}
            pageId={this.props.pageId}
            />

            <AddComment
            initialValues={routeParams}
            />

        </div>
      </div>
    );
  }
}
