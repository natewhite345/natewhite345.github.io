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
const isMobile = window.innerWidth < 800

function showPdf(filename) {
    /* Initialize the AdobeDC View object */
    var adobeDCView = new AdobeDC.View({
        /* Pass your registered client id */
        clientId: window.location.hostname === "localhost" ? "ae205f81948145e0a35fd86a2d6891b9" : "6542fd00cade4e538defdabc4de706dd",
        /* Pass the div id in which PDF should be rendered */
        divId: "adobe-dc-view",
    });

    /* Invoke the file preview API on Adobe DC View object */
    adobeDCView.previewFile({
        /* Pass information on how to access the file */
        content: {
            /* Location of file where it is hosted */
            location: {
                url: "/" + filename,
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
            fileName: filename
        }
    }, {
        /* Allowed possible values are "FIT_PAGE", "FIT_WIDTH", "TWO_COLUMN", "TWO_COLUMN_FIT_PAGE" or "". */
        showDownloadPDF: true,
        focusOnRendering: false,
        includePDFAnnotations: true,
        showThumbnails: false,
        showAnnotationTools: false,
        defaultViewMode: "FIT_WIDTH",
        embedMode: isMobile ? "IN_LINE" : "" // Inline mode doesn't support tooltips, but looks nicer because it uses the full width with no side menus and doesn't have its own scrollbar. On desktop, we don't opt for this so the tooltips are supported, but on mobile tooltips are irrelevant anyways and it is more important to make the best use of space possible.
    });
}

function resizeViewerWindow(){
    /**
     * Resizes the viewer window to have a height roughly equivalent to one page, assuming the view mode is FIT_WIDTH
     */
    document.getElementById("adobe-dc-view").style.height = 1.2*+getComputedStyle(document.getElementById("adobe-dc-view")).width.replace("px","")+"px"
}

/* Wait for Adobe Acrobat Services PDF Embed API to be ready */
document.addEventListener("adobe_dc_view_sdk.ready", function () {
    const resTab = document.getElementById("resume-tab");
    const tranTab = document.getElementById("transcript-tab");
    document.getElementById("resume-btn").addEventListener("click", () => {
        resTab.classList.add("active-tab");
        tranTab.classList.remove("active-tab");
        showPdf("White_Nathaniel_Resume.pdf");
    })
    document.getElementById("transcript-btn").addEventListener("click", () => {
        tranTab.classList.add("active-tab");
        resTab.classList.remove("active-tab");
        showPdf("White_Nathaniel_Transcript.pdf");
    })
    showPdf("White_Nathaniel_Resume.pdf");
    if (!isMobile) {
        document.getElementById("tooltip-toast").classList.add("show")
        setTimeout(() => document.getElementById("tooltip-toast").classList.remove("show"), 3000)
    }
    document.getElementById("resume-tab").classList.add("active-tab");
    resizeViewerWindow();
    window.addEventListener("resize",()=>resizeViewerWindow())
});

fetch("last-updated.txt").then(res=>res.text()).then(txt => document.getElementById("last-updated").innerHTML = txt)
