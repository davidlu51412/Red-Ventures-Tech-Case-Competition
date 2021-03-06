// Function applyImdbThumbnail
// Param - div: The div to change the background image too
// Param - isHome: boolean if the current page is the home page or not
// Param - id: The imdb ID of the movie/show that needs the thumbnail pulled
function applyImdbThumbnail(div, getLargeVersion, id) {
	// Send ajax GET request to php script with the imdb url
	$.ajax({
		url: "/helper_scripts/pull_site.php?url=https://www.imdb.com/title/" + id + "/",
		type: 'GET',
		success: function(response) {
			// cut the resulting text to extract the image URL
			var img = response.replace(response.substring(0, response.indexOf("src=\"")+5), "");
			img = img.substring(0, img.indexOf("\" />"));

			// Check if the current page is the homepage, if it is, change the image URL to pull a large sized image
			if (getLargeVersion) {
				img = img.replace("182,268", "675,1000");
				img = img.replace(img.substring(img.indexOf("_U")+1, img.indexOf("CR")), "SY1000_");
			}

			// Update the background of the div with the pulled image
			$(div).css("background", "url(" + img + ")");

			// Call the removeShine function passing the div that the image was applied to
			removeShine(div);
		}
	});
}

// Removes the shimmering effect and replaces it with the image
function removeShine(div) {
	$(div).removeClass("shine");
	$(div).addClass("loaded");
}
