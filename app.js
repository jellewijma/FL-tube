function openModal() {
    var modal = document.getElementById("modal");
    if (modal.classList.contains('flex')) {
        modal.classList.remove("flex");
        modal.classList.add("hidden");
    } else {
        modal.classList.add("flex");
        modal.classList.remove("hidden");
    }
}

// onload page get all videos from supbase
window.onload = async function () {
    // Connect to Supabase using the CDN
    loadVideos();
}

async function loadVideos() {
    const supabase_ = supabase.createClient('https://sexqxvxgruhbrxvvagin.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNleHF4dnhncnVoYnJ4dnZhZ2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4MTA0NDMsImV4cCI6MjAxOTM4NjQ0M30.ycNuXYquHcina7mNwJsST34sjBN0p2b0hmmHDUfXcEQ');

    // Example: Read data from a Supabase table
    const { data, error } = await supabase_
        .from('videos')
        .select('*');

    if (error) {
        console.error(error);
    } else {
        console.log('Data retrieved successfully:', data);
        var videos = document.getElementById("videos");
        data.forEach(element => {
            var video = document.createElement("iframe");
            video.classList.add("w-3/4", "aspect-video", "mx-auto");
            video.setAttribute("src", element.url);
            video.setAttribute("allow", "autoplay; encrypted-media; gyroscope; picture-in-picture");
            var tag = document.createElement("div");
            tag.classList.add("tag");
            tag.innerHTML = element.tag;
            video.appendChild(tag);
            videos.appendChild(video);
        });
    }
}

video.addEventListener('ended', function () {
    // action you want to happen at the end of the video
    alert("Video ended");
});

form = document.getElementById("modal")

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    var rawUrl = document.getElementById("url").value;
    var tag = document.getElementById("tag").value;

    // check if url is valid
    if (!rawUrl.includes("youtu.be/")) {
        alert("Invalid URL");
        return;
    }

    url = rawUrl.replace("youtu.be/", "www.youtube.com/embed/");

    // Connect to Supabase using the CDN
    const supabase_ = supabase.createClient('https://sexqxvxgruhbrxvvagin.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNleHF4dnhncnVoYnJ4dnZhZ2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4MTA0NDMsImV4cCI6MjAxOTM4NjQ0M30.ycNuXYquHcina7mNwJsST34sjBN0p2b0hmmHDUfXcEQ');

    // Example: Insert data into a Supabase table
    const { data, error } = await supabase_
        .from('videos')
        .insert([{ url, tag }]);

    if (error) {
        console.error(error);
    } else {
        console.log('Data inserted successfully:', data);
        openModal();
        document.getElementById("url").value = "";
        document.getElementById("tag").value = "";
        loadVideos();
    }
});
