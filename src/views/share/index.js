export default {
  created() {
    var s_oid = $.url.param("s_oid");
    var weixin_openid = $.url.param("openid");

    // 设置并返回全部配置信息
    PALifeOpenH5.config({
      debug: false,
      isProd: true,
      autoMergeRecord: true,
    });
    if (weixin_openid) {
      PALifeOpenH5.addRecord("49902-20210308434891", "4990201-20210308434891", {
        act_action: "read",
        s_id: weixin_openid,
        openid: weixin_openid,
        s_oid: s_oid,
        userid: s_oid,
      });

      _czc.push(["_trackEvent", "分享页", "浏览"]);
    } else {
      // PALifeOpenH5.wxAuthInit(window.location.href);
    }
  },
  methods: {
    onGo() {
      location.href =
        "https://m3.lifeapp.pingan.com.cn/m/actevo/wx-extinfo/index.html?url=pars%3A%2F%2Fpars.pingan.com%2Fopen_url%3Furl%3Dhttps%253A%252F%252Fm3.lifeapp.pingan.com.cn%252Fm%252Factevo%252Fsign-up%252Findex.html%253Faid%253D20210308434891%2526source%253Dshare%2526redirectUri%253Dhttps%25253A%25252F%25252Fsc.h5kk.cn%25252Fsc-ydy2%25252Findex.html%26type%3Dwk";
    },
  },
};