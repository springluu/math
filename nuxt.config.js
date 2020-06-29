require("dotenv").config();
const webpack = require("webpack");

module.exports = {
  dev: true,
  head: {
    title: "Schoolly",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, user-scalable=no, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "Schoolly là hệ thống E-learning duy nhất hiện nay đáp ứng đầy đủ và hiệu quả các nhu cầu của việc học trực tuyến tại trường Phổ thông cho nhiều đối tượng tham gia: học sinh, giáo viên, nhà trường.",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon/favicon.svg",
      },
    ],
  },

  env: {
    BASE_ORIGIN_LOCATION: process.env.BASE_ORIGIN_LOCATION,
    SOCKET_URI: process.env.SOCKET_URI,
    PAYMENT_REQ_URL: process.env.PAYMENT_REQ_URL,
    PAYMENT_RETURN_URL: process.env.PAYMENT_RETURN_URL,
    PAYMENT_VPC_VERSION: process.env.PAYMENT_VPC_VERSION,
    PAYMENT_VPC_ACCESS_CODE: process.env.PAYMENT_VPC_ACCESS_CODE,
    PAYMENT_VPC_COMMAND: process.env.PAYMENT_VPC_COMMAND,
    PAYMENT_VPC_CURRENCY: process.env.PAYMENT_VPC_CURRENCY,
    PAYMENT_VPC_MERCHANT: process.env.PAYMENT_VPC_MERCHANT,
    PAYMENT_VPC_TICKETNO: process.env.PAYMENT_VPC_TICKETNO,
    PAYMENT_AGAIN_LINK: process.env.PAYMENT_AGAIN_LINK,
    FB_API_KEY: process.env.FB_API_KEY,
    FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN,
    FB_DB_URL: process.env.FB_DB_URL,
    FB_PROJECT_ID: process.env.FB_PROJECT_ID,
    FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET,
    FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID,
    FB_APP_ID: process.env.FB_APP_ID,
    FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID,
    FB_FCM_PUBLIC_VAPI_KEY: process.env.FB_FCM_PUBLIC_VAPI_KEY,
  },

  /**
   * config local server|port
   */
  server: {
    port: process.env.PORT,
    host: "0.0.0.0",
  },

    /*
     ** modules
     */
    plugins: [
        { src: "@/plugins/axios.js", ssr: true },
        { src: "@/plugins/click-outside.js", ssr: false },
        { src: "@/plugins/global.js" },
        { src: "@/plugins/vue-awesome-swiper.js", ssr: false },
        { src: "@/plugins/textarea-autosize.js", ssr: false },
        { src: "@/plugins/vuelidate.js", ssr: true },
        { src: "@/plugins/vue-moment.js" },
        { src: "@/plugins/vue-select.js" },
        { src: "@/plugins/filters.js" },
        { src: "@/plugins/vue-fragment.js" },
        { src: "@/plugins/vue-toast.js", ssr: false },
        { src: "@/plugins/vue-infinite-loading.js", ssr: false },
        { src: '~/plugins/vue-cropper', ssr: false },
        { src: "@/plugins/sticky.js", ssr: false },
        { src: "@/plugins/tooltip.js", ssr: false },
        { src: "@/plugins/vue-input-number.js" },
        { src: '@/plugins/streaming.js', ssr: false },
        { src: '@/plugins/v-scroll-lock.js', ssr: false },
        { src: '@/plugins/scrollTo.js', ssr: false },
        '~/plugins/vue-lazyload',
        '~/plugins/vue-scrollto',
    ],
    /**
     * Global middleware
     */
    router: {
        middleware: ["check-auth", "mobile-view", "watch-route"]
    },

  /*
   ** modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/svg",
    "portal-vue/nuxt",
    "@nuxtjs/recaptcha",
    "@nuxtjs/pwa",
    "@nuxtjs/firebase",
    "@nuxtjs/device",
    ["vue-scrollto/nuxt", { duration: 300, easing: "ease" }],
    "vue-social-sharing/nuxt",
  ],

  buildModules: ["@nuxtjs/style-resources"],

  /*
   ** axios module options
   * https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL_API, // Default: http://[HOST]:[PORT][PREFIX]
    redirectError: {
      401: "/login",
      404: "/404",
    },
    retry: {
      retries: 0,
    }, // interceptor retry time request
    debug: false, // default false
  },

  recaptcha: {
    siteKey: process.env.CAPTCHA_SITEKEY,
    version: 3,
  },

  styleResources: {
    scss: [
      "~assets/scss/abstracts/_variables.scss",
      "~assets/scss/abstracts/_functions.scss",
      "~assets/scss/abstracts/_mixins.scss",
      "~assets/scss/abstracts/*.scss",
      "~assets/scss/vendors/*.scss",
    ],
  },

  firebase: {
    config: {
      apiKey: process.env.FB_API_KEY,
      authDomain: process.env.FB_AUTH_DOMAIN,
      databaseURL: process.env.FB_DB_URL,
      projectId: process.env.FB_PROJECT_ID,
      storageBucket: process.env.FB_STORAGE_BUCKET,
      messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
      appId: process.env.FB_APP_ID,
      measurementId: process.env.FB_MEASUREMENT_ID,
      fcmPublicVapidKey: process.env.FB_FCM_PUBLIC_VAPI_KEY,
    },
    services: {
      messaging: {
        createServiceWorker: true,
      },
    },
  },
  pwa: {
    workbox: {
      importScripts: ["/firebase-auth-sw.js"],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false,
    },
  },

  /*
   ** Global CSS
   */
  css: ["@/assets/scss/styles.scss"],

  /*
   ** Customize the progress bar color
   */
  loading: false,

  /*
   ** Build configuration
   */
  build: {
    /**
     * add external plugins
     */
    vendor: ["jquery"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery: "jquery",
      }),
    ],
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      config.node = {
        console: false,
        fs: "empty",
        net: "empty",
        tls: "empty",
        child_process: "empty",
        module: "empty",
      };
      if (isDev && isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }

      if (isDev) {
        config.devtool = isClient ? "source-map" : "inline-source-map";
      }
    },
    loaders: {
      imgUrl: { esModule: false }
    }
  },
};
