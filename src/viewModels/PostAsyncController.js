
class PostAsyncController {

    postCategorytypes = {
        "Fit Recipes Post" : "Fit receipe",
        "Fitness Products Post" : "Fitness Product",
        "Fitness Services Post" : "Fitness Services",
        "Transformation Stories Post" : "Transformation Story",
        "Fit StoryBoards Post" : "Fit StoryBoards"
    }

    postCategoryheaderMsgs = {
        "Fit Recipes Post" : "Select receipe Pic",
        "Fitness Products Post" : "Select product Pic",
        "Fitness Services Post" : "Select service Pic",
        "Transformation Stories Post" : "Select transformation Pic",
        "Fit StoryBoards Post" : "Select storyboard pic"
    }

    getpostItem = (postinfo, lstoffiles) => {
        const uploadfilesInfo = this.getmergefileInfo(lstoffiles, undefined);
        return this.createformData(postinfo, uploadfilesInfo,"postInfo");
    }

    createformData = (postinfo, uploadfilesInfo, postCategory)=>{
        
        const registrationData = new FormData();
        //add all images
        for (let index = 0; index < uploadfilesInfo.allfiles.length; index++) {
            registrationData.append('images', uploadfilesInfo.allfiles[index]);
        }

        //add userinfo/postinfo category
        postinfo["uploadfolderInfo"] = uploadfilesInfo.mergefilesInfo;
        registrationData.append(postCategory, JSON.stringify(postinfo));
        return registrationData;
    }

    //merge all files 
    getmergefileInfo = (imageData, profilepicInfo)=> {
        let allfiles = [];
        let mergefilesInfo = {};

        let lstofFoldersnames = Object.keys(imageData);
        for (let fldrIndex = 0; fldrIndex < lstofFoldersnames.length; fldrIndex++) {
            let lstoffiles = imageData[lstofFoldersnames[fldrIndex]].filter(item => undefined !== item);
            allfiles = [...allfiles, ...lstoffiles];
            mergefilesInfo[lstofFoldersnames[fldrIndex]] = lstoffiles.length;
        }

        if(profilepicInfo){
            allfiles.push(profilepicInfo)
            mergefilesInfo["profilepic"] = 1;
        }

        return {allfiles, mergefilesInfo};
    }


    getConfirmationObject(post_category){
        return {
            "showConfirmationDlg" : false,
            "confirmationHeading" : "Confirmation :",
            "confirmationMessage" : "Are you sure you want to post the " + this.postCategorytypes[post_category] + "?"
        };
    }


    getProfilePicSelectionState() {
        return {
           "profilepic1loaded" : false,
           "profilepic2loaded" : false,
           "profilevideoloaded": false,
           "name"              : -1
        };
    }

    getProfilePicInfo(post_category) {
        return{
            name        : -1,
            opendialog : false, 
            profilepicInfo : null, 
            showcropIcons  : false, 
            removePicState : false,
            headerMessage  : this.postCategoryheaderMsgs[post_category]
        };
    }

    getDefaultPostComment() {
        return {
            "user_id"           : "",
            "post_category"     : "", 
            "post_desc"         : "",
            "currency_category" : "", 
            "currency"          : 0,
            "whatsapp_number"   : ""
        }
    }

}

export default PostAsyncController;