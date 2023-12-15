<div class="form-widget">
	<div id="SetProfileVipLevel" data-profileId="{{$profileId}}"></div>
	@if($isWhiteListed && getCMSConfiguration('prizewheel'))
		<div id="updatePrizePoolWheel">
			<h4>Prize Wheel Testing :</h4>
			<input type='hidden' id='user-id' value='{{ $profile->userID }}'/>
			<input type='hidden' id='user-app' value='{{ $profile->appId }}'/>
			<div style="margin-bottom: 14px;" id="updatePrizePoolWheelDiv"></div>
		</div>
	@endif
</div>


<script src="{{ mix('js/profile_manager/app.js')}}"></script>
