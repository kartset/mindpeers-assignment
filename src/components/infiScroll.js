import axios from "axios";
import { useEffect, useState } from "react";


export default function InfiScroll(query, pageNumber) {
    const [loading ,setLoading] = useState(true);
    const [url ,setUrl] = useState([]);
    const [hasMore ,setHasMore] = useState(true);

    useEffect(() => {
        setLoading(true);
        if(query) {
            axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=446efc4ee28fd1300964acd1ab1bb110&tags="+query+"&text="+query+"&per_page=150&page="+pageNumber+"&format=json&nojsoncallback=1")
            .then(res => {
                //console.log(res.data["photos"]);
                res.data["photos"]["photo"].forEach(element => {
                    let photoID = element['id']
                    let secret = element['secret'];
                    let server_id = element['server'];
                    let size_suffix = "n";
                    //setUrl([...url, "https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"])
                    //setUrl(prevUrl => {
                    //    return [...prevUrl, "https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"]
                    //})
                    //setUrl(url => [...url, "https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"])
                    url.push("https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg")
                })
                //console.log(url);
                let photostillnow = res.data["photos"]["page"]*res.data["photos"]["perpage"];
                let totalphotos = res.data["photos"]["total"];
                //console.log(photostillnow);
                //console.log(totalphotos);
                if(photostillnow < totalphotos) {
                    setHasMore(true)
                }
                else {
                    setHasMore(false);
                    setLoading(false);
                }
            })
    

        }else if(query === "") {
            axios.get("https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=446efc4ee28fd1300964acd1ab1bb110&per_page=150&page=1&format=json&nojsoncallback=1")
            .then(res => {
            //console.log(res.data["photos"]);
            res.data["photos"]["photo"].forEach(element => {
                let photoID = element['id']
                let secret = element['secret'];
                let server_id = element['server'];
                let size_suffix = "n";
                //setUrl([...url, "https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"])
                //setUrl(prevUrl => {
                //    return [...prevUrl, "https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"]
                //})
                //setUrl(url => [...url, "https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg"])
                url.push("https://live.staticflickr.com/" + server_id + "/" + photoID + "_" + secret+ "_" + size_suffix + ".jpg")
            })
            //console.log(url);
            let photostillnow = res.data["photos"]["page"]*res.data["photos"]["perpage"];
            let totalphotos = res.data["photos"]["total"];
            //console.log(photostillnow);
            //console.log(totalphotos);
            if(photostillnow < totalphotos) {
                setHasMore(true)
            }
            else {
                setHasMore(false);
                setLoading(false);
            }
        })
        }
        return null;
    }, [query, pageNumber])

    return {loading, url, hasMore};
}
