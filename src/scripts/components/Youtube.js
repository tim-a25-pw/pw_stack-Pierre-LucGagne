export default class Youtube {
  constructor(element) {
    this.element = element;

    this.videoContainer = this.element.querySelector('.js-video');
    this.poster = this.element.querySelector('.js-poster');
    this.videoId = this.element.dataset.videoId;
    this.autoplay = this.poster ? 1 : 0;
    this.playerReady = false;
    Youtube.instances.push(this);
    // console.log('constuctor Youtube');
    if (this.videoId) {
      Youtube.loadScript();
    } else {
      console.error('vous devez specifier un id');
    }
  }

  static loadScript() {
    console.log('le code se rend ici !!!');

    if (!Youtube.scriptIsLoading) {
      Youtube.scriptIsLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }

  init() {
    this.initPlayer = this.initPlayer.bind(this);

    console.log('Le js est pret');

    if (this.poster) {
      this.element.addEventListener('click', this.initPlayer);
    } else {
      this.initPlayer();
    }
  }
  initPlayer(event) {
    if (event) {
      this.element.removeEventListener('click', this.initPlayer);
    }
    this.player = new YT.Player(this.videoContainer, {
      height: '100%',
      width: '100%',
      videoId: this.videoId,
      playerVars: { rel: 0, autoplay: this.autoplay, controls: 0 },
      events: {
        onReady: () => {
          this.playerReady = true;

          const observer = new IntersectionObserver(this.watch.bind(this), {
            rootMargin: '0px 0px 0px 0px',
          });
          observer.observe(this.element);
        },
        onStateChange: (event) => {
          if (event.data == YT.PlayerState.PLAYING) {
            Youtube.pauseAll(this);
          } else if (event.data == YT.PlayerState.ENDED) {
            console.log('ended');
            this.player.seekTo(0);
            this.player.pauseVideo();
          }
        },
      },
    });
  }

  watch(entries) {
    if (this.playerReady && !entries[0].isIntersecting) {
      this.player.pauseVideo();
    }
  }

  static initAll() {
    document.documentElement.classList.add('is-video-ready');

    for (let i = 0; i < Youtube.instances.length; i++) {
      const instance = Youtube.instances[i];
      instance.init();
    }
  }

  static pauseAll(currentInstance) {
    for (let i = 0; i < Youtube.instances.length; i++) {
      const instance = Youtube.instances[i];
      if (instance.playerReady && instance !== currentInstance) {
        instance.player.pauseVideo();
      }
    }
  }
}

Youtube.instances = [];
window.onYouTubeIframeAPIReady = Youtube.initAll;
