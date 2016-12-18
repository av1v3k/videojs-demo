$(document).ready(function(){
	$("video").each(function(videoIdx){
		var me_ = $(this), st = me_.data("st"), ap = me_.data("ap"), en = me_.data("en"), lp = me_.data("loop"), ntlp = 0;
		me_.addClass("video-js vjs-default-skin vjs-big-play-centered");
		me_[0].controls = true;
		me_.attr("preload", true);

			videojs(me_.attr("id"), {autoplay:ap}, function(){
					var player = this, pD = player.duration();
					player.on("playing", function(){
							$(".video-js").each(function(vIdx){
									if(vIdx !== videoIdx){
										this.player.pause();
									}
							});
					});
					player.on("play", function(){
							st = st || 0;
							player.currentTime(st).play();
							//player.play();
							//console.log("Playing");
					});
					player.on("timeupdate", function(){
						console.log(player.duration());
							if(lp){//loopable
							//console.log("R u coming insie?");
								en = en || pD;
								if(en && (player.currentTime() === en.toFixed(3)) ){
									player.pause().load().play();
								}
							}
							else{// NOT loopable
								//player.play();
								if(!lp && ntlp === 0){
									player.currentTime(st);
									ntlp = 1;
								}
								//console.log(player.currentTime());
								en = en || pD;
								if(en && (player.currentTime() === en.toFixed(3)) ){
									player.pause().load().play();
								}
							}
					});
			});
	});
});