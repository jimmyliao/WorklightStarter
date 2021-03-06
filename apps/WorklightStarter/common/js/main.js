var feeds = null;

/*
jq(".FeedItem").live("click", function(){
	displayFeed(jq(this).attr("id"));
});
*/
function myAjax(){

	var feedApiAjax = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=';
	var feedApiGetJSON = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q=';
	var feedUrl = 'http://www.engadget.com/rss.xml';
	jq.ajax({
//        crossOrigin: true,
	    dataType: "jsonp",
                url: feedApiAjax + feedUrl,
                success: function(data) {
                    console.log('jq.ajax() success');
                    loadEnagetFeedsTest(data);
                },
                error: function(xhr, testStatus, error) {
                    console.log('jq.ajax() error, ' + error + ", testStatus=" + testStatus);
                }

            });
}

function loadEnagetFeedsTest(data) {
	// load to div id='FeedContent'
	console.log('loadEnagetFeedsTest.');
	if (!data || !data.responseData || !data.responseData.responseDetails || data.responseData.responseStatus!=200)
		showErrorMessage("Could not retrieve feeds");
	
	feeds = data.responseData.feed.entries;
	jq("#FeedsList").empty();
	
	for (var i=0; i<feeds.length; i++){
		var dataItem = feeds[i];
		var listItem = jq("<li class='FeedItem' id='" + i + "'><a href='#'><h3>" + dataItem.title + "</h3><p>"+ dataItem.publishedDate+"</p></a></li>");
		console.log("<li class='FeedItem' id='" + i + "'><a href='#'><h3>" + dataItem.title + "</h3><p>"+ dataItem.pubDate+"</p></a></li>");

		jq("#FeedsList").append(listItem);
	}
	
	jq("#FeedsList").listview('refresh');

}

function loadFeeds(){
	// jq.mobile.showPageLoadingMsg();
	var invocationData = {
			adapter: "WorklightStarterAdapter",
			procedure: "getEngadgetFeeds",
			//parameters: [true]
			parameters: [false]
	};
	
	WL.Client.invokeProcedure(invocationData, {
		onSuccess: loadFeedsOK, 
		onFailure: loadFeedsFAIL
	});
}

function loadFeedsOK(data){
	if (!data || !data.invocationResult || !data.invocationResult.items || data.invocationResult.items.length==0)
		showErrorMessage("Could not retrieve feeds");
	
	feeds = data.invocationResult.items;
	jq("#FeedsList").empty();
	
	for (var i=0; i<feeds.length; i++){
		var dataItem = feeds[i];
		var listItem = jq("<li class='FeedItem' id='" + i + "'><a href='#'><h3>" + dataItem.title + "</h3><p>"+ dataItem.pubDate+"</p></a></li>");
		jq("#FeedsList").append(listItem);
	}
	
	jq("#FeedsList").listview('refresh');
	// jq.mobile.hidePageLoadingMsg();
}

function loadFeedsFAIL(data){
	showErrorMessage("Server connectivity error");
}

function displayFeed(feedId){
	//jq.mobile.showPageLoadingMsg();
	var itemHtml = feeds[feedId].description;
	var item = jq(itemHtml);
	
	jq(item).find("img").each(function(){
		if (jq(this).attr("src").indexOf("jpg")>=0)
			jq(this).width(260);
	});
	
	jq("#FeedContent").html(item);
	jq("#FeedContent a").attr("target","_blank");

	setTimeout(function(){
		//jq.mobile.hidePageLoadingMsg();
		jq.mobile.changePage("#FeedContentPage");
	}, 0);
	
}

function showErrorMessage(text){
	//jq.mobile.hidePageLoadingMsg();
	jq("#DialogText").html(text);
	jq.mobile.changePage("#DialogPage");
}

function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a Worklight Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the Worklight Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	//loadFeeds();

}
