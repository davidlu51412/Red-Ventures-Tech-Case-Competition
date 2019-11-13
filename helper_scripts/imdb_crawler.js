function applyImdbThumbnail(div, isHome, id, oncomplete) {
	$.ajax({
		url: "/helper_scripts/pull_site.php?url=https://www.imdb.com/title/" + id + "/",
		type: 'GET',
		success: function(response) {
			var html = $.parseHTML(response);

			var img = response.replace(response.substring(0, response.indexOf("src=\"")+5), "");
			img = img.substring(0, img.indexOf("\" />"));

			if (isHome) {
				img = img.replace("182,268", "675,1000");
				img = img.replace(img.substring(img.indexOf("_U")+1, img.indexOf("CR")), "SY1000_");
			}
			
			$(div).css("background", "url(" + img + ")");

			oncomplete();
		}
	});
}
