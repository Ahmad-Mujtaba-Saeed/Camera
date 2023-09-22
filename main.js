const appID = '008547b1140348e5b1a091f256922ed6'; // Replace with your Agora App ID
const localVideoContainer = document.getElementById('localVideo');
const remoteVideoContainer = document.getElementById('remoteVideo');
const joinButton = document.getElementById('joinButton');
const leaveButton = document.getElementById('leaveButton');

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

joinButton.addEventListener('click', async () => {
  const uid = await client.join(appID, 'room-name', null);
  
  // Create and initialize a local stream
  const localStream = AgoraRTC.createStream({
    streamID: uid,
    audio: true,
    video: true
  });
  await localStream.init();
52
  // Play the local stream in the local video container
  localStream.play('localVideo');
5
  // Publish the local stream to the channel
  client.publish(localStream);

  // Subscribe to remote streams
  client.on('stream-added', evt => {
    const remoteStream = evt.stream;
    client.subscribe(remoteStream);
  });

  // Play remote streams in the remote video container
  client.on('stream-subscribed', evt => {
    const remoteStream = evt.stream;
    remoteStream.play('remoteVideo');
  });
});

leaveButton.addEventListener('click', () => {
  client.leave();

  // Clear video containers
  localVideoContainer.innerHTML = '';
  remoteVideoContainer.innerHTML = '';
});
