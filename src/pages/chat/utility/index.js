import React from 'react'
import { File, Image, Music, Archive, FileText, Code, Film } from 'react-feather'
import Linkify from 'linkifyjs/react';
import { GET_DOCUMENT_URL } from '../../../helpers/url_helper';



let videoFiles = ["webm", "mpg", "mp2", "mpeg", "mpe", "mpv", "ogg",
    "mp4", , "m4p", 'm4v', 'avi', 'wmv', 'mov', 'qt', "flv", 'swf', 'avchd']

let imageFiles = ["jpg", "jpeg", "jpe", "jif", "jfif", "jfi",
    "png", "gif", "webp", "tiff", "tif", "bmp", "dib",
    "jp2", "j2k", "jpf", "jpx", "jpm", "mj2", "svg", "svgz"]

let audioFiles = ["wav", "wave", "aiff", "aif", "aifc", "pcm", "au", "l16", "flac", "m4a", "caf",
    "wma", "wmv", "mp3", "ogg", "oga", "mogg", "aac", "3gp", "m4r"]

let zipFiles = [
    "zip", "zipx", "tar", "gz", "z", "cab", "rar", "bz2", "lzh", "7z", "img", "iso", "xz", "vhd", "vmdk"
]

let documentFiles = [
    "doc", "docx", "odt", "pdf", "xls", "xlsx", "ods", "ppt", "pptx", "txt", "csv", "tsv", "pages", "numbers",
]

let codeFiles = ["html", "htm", "php", "aspx", "asp", "jsp",
    "js", "jsx", "ts", "json", "c", "cgi", "pl", "class", "cpp",
    "cs", "h", "java", "php", "py", "sh", "swift", "vb"]



export const getChatNotificationIds = () => {
    const obj = localStorage.getItem("chatNotificationsIds")
    return obj ? JSON.parse(obj) : {};
}

/**
 * 
 * @param {Object} obj 
 */
export const setChatNotificationIds = (obj) => {
    localStorage.setItem("chatNotificationsIds", JSON.stringify(obj || {}))
}




/**
 * 
 * @param {string} extension 
 */
export const getFileIcon = (ex) => {
    let size = 16

    if (videoFiles.find(v => v == ex)) return <Film size={size} />
    if (imageFiles.find(i => i == ex)) return <Image size={size} />
    if (audioFiles.find(a => a == ex)) return <Music size={size} />
    if (zipFiles.find(z => z == ex)) return <Archive size={size} />
    if (documentFiles.find(d => d == ex)) return <FileText size={size} />
    if (codeFiles.find(c => c == ex)) return <Code size={size} />

    return <File size={size} />
}


/**
 * 
 * @param {string} url 
 * @param {string} ex
 * @param{Boolean} darkmode
 * @returns 
 */
export const getFilePreview = (url, ex) => {

    if (videoFiles.find(v => v == ex))
        return (
            <div className="preview">
                <video controls>
                    <source src={GET_DOCUMENT_URL(url)} type={`video/${ex}`} />
                </video>
            </div>
        )
    if (imageFiles.find(i => i == ex)) return <div className="preview"><img src={GET_DOCUMENT_URL(url)} /></div>
    if (audioFiles.find(a => a == ex))
        return (
            <div className="preview">
                <audio
                    controls
                >
                    <source src={GET_DOCUMENT_URL(url)} type={`audio/${ex}`} />
                </audio>
            </div>
        )

    return ""
}

export function detectLinkInMessage(text) {
    var options = {
        defaultProtocol: 'https', target: {
            url: '_blank'
        },
    };
    return <Linkify tagName="span" options={options}>{text}</Linkify>;
}