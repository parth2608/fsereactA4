import React, {useEffect, useState} from "react";
import * as serviceU from "../../services/auth-service";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {
    const [user, setUser] = useState({});
    console.log(user);
    useEffect( async ()=> {
        const findUser = await serviceU.profile();
        setUser(findUser);
    }, [])

    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
            <span onClick={() => likeTuit(tuit)}>
              {(()=>{
                  if(user && tuit.stats.likes > 0) {
                      return(<i className="fa-regular fa-thumbs-up" style={{color: 'red'}}/>)
                  }
                  else {
                      return(<i className="fa-regular fa-thumbs-up"/>)
                  }
              })()}
              {tuit.stats && tuit.stats.likes}
            </span>
         </div>
         <div className="col">
             <span onClick={()=> dislikeTuit(tuit)}>
                 {(()=>{
                     if(user && tuit.stats.dislikes) {
                         return(<i className="fa-regular fa-thumbs-down" style={{color: 'red'}}/>)
                     }
                     else {
                         return(<i className="fa-regular fa-thumbs-down"/>)
                     }
                 })()}
                 {tuit.stats && tuit.stats.dislikes}
             </span>
         </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;
