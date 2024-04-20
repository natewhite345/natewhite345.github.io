/*
Copyright 2019 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it. If you have received this file from a source other than Adobe,
then your use, modification, or distribution of it requires the prior
written permission of Adobe.
*/

/* Control the default view mode */
const viewerConfig = {
    /* Allowed possible values are "FIT_PAGE", "FIT_WIDTH", "TWO_COLUMN", "TWO_COLUMN_FIT_PAGE" or "". */
    defaultViewMode: "FIT_WIDTH",
    showPrintPDF: false,
    showDownloadPDF: false,
    showBookmarks: false,
    showThumbnails: false,
    showZoomControl: true,
    showAnnotationTools:false,
    showFullScreen: false,
    //embedMode: "SIZED_CONTAINER"
};

function setupPDF(id,link,filename){
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: "cbf93b9f52154aa78547446e15db69aa",
        /* Pass the div id in which PDF should be rendered */
        divId: id,
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: link,
                // headers: [
                //     {
                //         key: "Content-Security-Policy",
                //         value: "style-src 'self' 'unsafe-inline'"
                //     },{
                //         key: "origin",
                //         value: "natetheadequate.github.io"
                //     }
                // ]
                /*
                If the file URL requires some additional headers, then it can be passed as follows:-
                headers: [
                    {
                        key: "<HEADER_KEY>",
                        value: "<HEADER_VALUE>",
                    }
                ]
                */
            },
        },
        /* Pass meta data of file */
        metaData: {
            /* file name */
            fileName: filename+".pdf"
        }
    }, viewerConfig);
    setTimeout(()=>{
        document.getElementById(id).style.height = "175vh"
    },3000)
}

/* Wait for Adobe Acrobat Services PDF Embed API to be ready */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    setupPDF("resume-div","https://raw.githubusercontent.com/natetheadequate/resumes/HEAD/White_Nathaniel_Resume.pdf","Resume")
    setupPDF("transcript-div","https://natetheadequate.github.io/Academic_Transcript.pdf","Transcript")
    setTimeout(()=>scrollTo(0,0),3000)
});
document.addEventListener("adobe_dc_view_sdk")