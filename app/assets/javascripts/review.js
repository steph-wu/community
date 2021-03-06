// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready(function() {
  $(".review_form_").on('submit', function(event){
    console.log(event);
    event.preventDefault();
    $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        dataType: 'json',
        data: $(this).serialize(),
    }).done(function(responseData) {
      console.log(responseData);

      // if (responseData.status? ) {
      //     var errorArr = responseData.error;
      //     var errorLength = errorArr.length;
      //     for (var i = 0; i < errorLength; i ++) {
      //     $('.help-block').append(errorArr[i]);
      //     console.log(errorArr[i]);
      // } else {
      // json object variables of new averages
      var user = responseData.user;
      var review = responseData.review;
      var space_avg = responseData.space_avg;
      var loc_avg = responseData.location_avg;
      var acc_avg = responseData.accuracy_avg;
      var fac_avg = responseData.facilities_avg;
      var comm_avg = responseData.communication_avg;
      var review_count = responseData.review_count;
      var review_update = review_count + ' Reviews';
      // console.log(review_count);
      // object attribute variables
      var content = review.content;
      var acc = review.accuracy;
      var comm = review.communication;
      var fac = review.facilities;
      var loc = review.location;
      var name = user.first_name;
      var time = review.updated_at;
      var reviewIdCreated = review.id;
      var avatar = user.avatar;
      var avatarUrl = avatar.url;
      var avatarImg = $("<img class='reviewer-avatar' />").attr('src', avatarUrl);
      // <p class="profile-image size50" style="background-image: url('<%= review.user.avatar %>')"></p>
      var starImg = $("<img />").attr('src', '/assets/stars.png');
      // var encodeUrl = (avatarUrl.replace(/ /,'/'));
      // new review averages
      var spans = $('.reviews_summary').children().children();
      var span_space = spans[0];
      var span_acc = spans[1];
      var span_comm = spans[2];
      var span_fac = spans[3];
      var span_loc = spans[4];

      // console.log(reviewIdCreated);
      // console.log(encodeUrl);

      // var imgTwo = $("<img />").attr('src', '/assets/stars.png');
      //   $("<img />").attr('src', '/assets/stars.png');
      // var imgThree = $("<img />").attr('src', '/assets/stars.png');
      // $("<img />").attr('src', '/assets/stars.png');
      // $("<img />").attr('src', '/assets/stars.png');

      // if (space_avg === 1) {
      //   $(span_space).prepend(img);
      // } else if (space_avg === 2) {
      //   $(span_space).prepend(img);
      //   $(span_space).prepend(img);
      // } else {
      //   $(span_space).prepend(img);
      //   $(span_space).prepend(img);
      //   $(span_space).prepend(img);
      // }

      // rendering the new averages as stars as a hack lolol!
      $(span_space).prepend(starImg);
      // $(span_acc).append(starImg);
      // $(span_comm).append(starImg);
      // $(span_fac).append(starImg);
      // $(span_loc).append(starImg);

      // rendering new review count/
      $('h2').html(review_update);
      // $('h2').append("<span class='blue-underline'>");

      // rendering the new averages as integers:
      // $(span_space).html(space_avg);
      $(span_acc).html(acc_avg);
      $(span_comm).html(comm_avg);
      $(span_fac).html(fac_avg);
      $(span_loc).html(loc_avg);

      $('#review_all').prepend(
        "<div class='review_container' data-review-id = '" + reviewIdCreated + "'>",
        '<p class="reviewer-content">' + content + '<br><br>',
        'Accuracy: ' + acc + '<br>',
        'Communication: ' + comm + '<br>',
        'Facilities: ' + fac + '<br>',
        'Location: ' + loc + '<br><br></p>',
        '<div class="reviewer-info">',
        avatarImg,
        // "<div class='reviewer-info'><p><div class='profile-image' style='background-image: " + avatarImg + "</div></p>",
        // "<div class='reviewer-info'><p><div class='profile-image' style='background-image: url('" + avatarImg + "')'</div></p>",
        '<br/><p class="reviewer-details">By: ' + name + '</p><br/>',
        '<p class="reviewer-details">Added on: ' + time + '</p></div>',
        // "<button>Was this review helpful?</button>",
        '<hr>');
      // }

      }).fail(function(responseData){
        console.log("u fail bb");
        console.log(responseData);
        // Array of error messages triggered by validations
        // var errorArr = responseData.error;
        // var errorLength = errorArr.length;
        // for (var i = 0; i < errorLength; i ++) {
        //   $('.help-block').append(errorArr[i]);
        //   console.log(errorArr[i]);
        // }
      }).always(function(responseData){
        console.log("this is always happening");
      });
    });

$('.reviews_container').delegate('.delete_review','click',function(event){
    event.stopPropagation();
    event.preventDefault();
    var reviewElement = $(event.target).parent();
    var reviewId = $(event.target).parent().data('reviewId');
    alert("selected!");
      $.ajax({
        url: '/reviews/' + reviewId,
        type: 'POST',
        dataType: 'json',
        data: {"_method":"delete"},
    }).done(function(responseData) {
      $(reviewElement).fadeOut("slow", function(){
        alert('Review faded...bye betch!');
      });
    }).fail(function(repsonseData){
      console.log("Delete Ajax failed!");
    });
  });
});
