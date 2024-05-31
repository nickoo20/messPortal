const useGetMyComplaints = () => {
    // const dispatch= useDispatch() ; 
    // const {refresh,isActive} = useSelector(store => store.tweet) ; 
    // // const {user}= useSelector(store => store.user) ;  
    // const fetchMyComplaints = async() => {
    //     try {
    //         const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, { 
    //             withCredentials:true
    //         });
    //         dispatch(getAllTweets(res.data.tweets)) ; 
    //     } catch (error) {
    //         console.log(error);
    //     }
    //    }
    //    const followingTweetHandler = async() => {
    //     // const id=user?._id ; 
    //     try{
    //         const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`,{
    //             withCredentials:true  
    //         }) ;
    //         console.log(res) ;
    //         dispatch(getAllTweets(res?.data?.tweets)) ;  
    //         // dispatch(getRefresh()) ; 
    //     }catch(error){
    //         console.log(error) ;
    //     }
    // }
    // useEffect(() => {
    //     if(isActive)    fetchMyProfile() ;
    //    else followingTweetHandler() ;
    // }, [refresh,isActive])  ;
}

export default useGetMyComplaints;