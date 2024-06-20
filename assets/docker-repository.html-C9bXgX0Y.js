import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,o as a,b as n}from"./app-DZw5DSeQ.js";const e={},l=n(`<h2 id="docker-镜像制作" tabindex="-1"><a class="header-anchor" href="#docker-镜像制作"><span>docker 镜像制作</span></a></h2><h3 id="alpine-java8-zh" tabindex="-1"><a class="header-anchor" href="#alpine-java8-zh"><span>alpine_java8_zh</span></a></h3><h4 id="v1-0-0" tabindex="-1"><a class="header-anchor" href="#v1-0-0"><span>v1.0.0</span></a></h4><h5 id="_1-dockerfile" tabindex="-1"><a class="header-anchor" href="#_1-dockerfile"><span>1.dockerfile</span></a></h5><div class="language-dockerfile line-numbers-mode" data-highlighter="shiki" data-ext="dockerfile" data-title="dockerfile" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#61AFEF;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> openjdk:8-jdk-alpine</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 添加timeZone</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#61AFEF;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> echo </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;http://mirrors.ustc.edu.cn/alpine/v3.9/main&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> &gt; /etc/apk/repositories \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> &amp;&amp; echo </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&#39;http://mirrors.ustc.edu.cn/alpine/v3.9/community&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> &gt;&gt;/etc/apk/repositories \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> &amp;&amp; apk --no-cache add tzdata \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> &amp;&amp; ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> &amp;&amp; echo </span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;">&quot;Asia/Shanghai&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> &gt; /etc/timezone</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 清理临时文件要在 同一个RUN命令内进行， rm -rf .....，构建的时候每个RUN都会创建一个临时的容器，只有写在同一个RUN下才会在一个容器内执行</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#61AFEF;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> apk --no-cache add ca-certificates wget &amp;&amp; \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub &amp;&amp; \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk &amp;&amp; \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-bin-2.35-r0.apk &amp;&amp; \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-i18n-2.35-r0.apk &amp;&amp; \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    apk add glibc-bin-2.35-r0.apk glibc-i18n-2.35-r0.apk glibc-2.35-r0.apk &amp;&amp; \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    rm -rfv glibc-bin-2.35-r0.apk glibc-i18n-2.35-r0.apk glibc-2.35-r0.apk</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># locale.md 见下面的内容</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#61AFEF;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> ./locale.md /locale.md</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#61AFEF;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> cat locale.md | xargs -i /usr/glibc-compat/bin/localedef -i {} -f UTF-8 {}.UTF-8 &amp;&amp; \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    rm -rfv locale.md</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#61AFEF;">ENV</span><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;"> LANG=en_US.UTF-8 \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">    LANGUAGE=en_US.UTF-8</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-locale-md" tabindex="-1"><a class="header-anchor" href="#_2-locale-md"><span>2.locale.md</span></a></h5><div class="language-markdown line-numbers-mode" data-highlighter="shiki" data-ext="markdown" data-title="markdown" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_AG</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_AU</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_BW</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_CA</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_DK</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_GB</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_HK</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_IE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_IN</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_NG</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_NZ</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_PH</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_SG</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_US</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_ZA</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_ZM</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">en_ZW</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">zh_CN</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">zh_HK</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">zh_SG</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">zh_TW</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ABB2BF;">zu_ZA</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-构建及验证" tabindex="-1"><a class="header-anchor" href="#_3-构建及验证"><span>3.构建及验证</span></a></h5><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 打包通过构建文件构建的镜像</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -f</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> alpine_java8_zh</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> chriswoodcn/alpine_java8_zh:1.0.0</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 创建容器aj1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;">  --name</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> aj1</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -dit</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> chriswoodcn/alpine_java8_zh:1.0.0</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 进入容器aj1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> aj1</span><span style="--shiki-light:#032F62;--shiki-dark:#98C379;"> /bin/sh</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;"># 验证locale是否设置成功</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#61AFEF;">/usr/glibc-compat/bin/locale</span><span style="--shiki-light:#005CC5;--shiki-dark:#D19A66;"> -a</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#...</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#zh_CN.utf8</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#zh_HK.utf8</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#zh_SG.utf8</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#zh_TW.utf8</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#zu_ZA.utf8</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic;">#...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),t=[l];function p(h,r){return a(),s("div",null,t)}const c=i(e,[["render",p],["__file","docker-repository.html.vue"]]),o=JSON.parse(`{"path":"/zh/posts/docker/docker-repository.html","title":"docker-repository","lang":"zh-CN","frontmatter":{"title":"docker-repository","date":"2023-02-09T11:12:06.000Z","categories":"docker","tags":["docker","docker-entrypoint"],"description":"docker 镜像制作 alpine_java8_zh v1.0.0 1.dockerfile 2.locale.md 3.构建及验证","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/zh/posts/docker/docker-repository.html"}],["meta",{"property":"og:site_name","content":"博客"}],["meta",{"property":"og:title","content":"docker-repository"}],["meta",{"property":"og:description","content":"docker 镜像制作 alpine_java8_zh v1.0.0 1.dockerfile 2.locale.md 3.构建及验证"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-19T08:58:34.000Z"}],["meta",{"property":"article:author","content":"chriswoodcn"}],["meta",{"property":"article:tag","content":"docker"}],["meta",{"property":"article:tag","content":"docker-entrypoint"}],["meta",{"property":"article:published_time","content":"2023-02-09T11:12:06.000Z"}],["meta",{"property":"article:modified_time","content":"2024-06-19T08:58:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"docker-repository\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-02-09T11:12:06.000Z\\",\\"dateModified\\":\\"2024-06-19T08:58:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"chriswoodcn\\"}]}"]]},"headers":[{"level":2,"title":"docker 镜像制作","slug":"docker-镜像制作","link":"#docker-镜像制作","children":[{"level":3,"title":"alpine_java8_zh","slug":"alpine-java8-zh","link":"#alpine-java8-zh","children":[]}]}],"git":{"createdTime":1718787514000,"updatedTime":1718787514000,"contributors":[{"name":"chriswoodcn","email":"chriswoodcn@aliyun.com","commits":1}]},"readingTime":{"minutes":1.01,"words":304},"filePathRelative":"zh/posts/docker/docker-repository.md","localizedDate":"2023年2月9日","excerpt":"<h2>docker 镜像制作</h2>\\n<h3>alpine_java8_zh</h3>\\n<h4>v1.0.0</h4>\\n<h5>1.dockerfile</h5>\\n<div class=\\"language-dockerfile line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"dockerfile\\" data-title=\\"dockerfile\\" style=\\"--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes github-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#61AFEF\\">FROM</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> openjdk:8-jdk-alpine</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\"># 添加timeZone</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#61AFEF\\">RUN</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> echo </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">'http://mirrors.ustc.edu.cn/alpine/v3.9/main'</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> &gt; /etc/apk/repositories \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> &amp;&amp; echo </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">'http://mirrors.ustc.edu.cn/alpine/v3.9/community'</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> &gt;&gt;/etc/apk/repositories \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> &amp;&amp; apk --no-cache add tzdata \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> &amp;&amp; ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> &amp;&amp; echo </span><span style=\\"--shiki-light:#032F62;--shiki-dark:#98C379\\">\\"Asia/Shanghai\\"</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> &gt; /etc/timezone</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\"># 清理临时文件要在 同一个RUN命令内进行， rm -rf .....，构建的时候每个RUN都会创建一个临时的容器，只有写在同一个RUN下才会在一个容器内执行</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#61AFEF\\">RUN</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> apk --no-cache add ca-certificates wget &amp;&amp; \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub &amp;&amp; \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk &amp;&amp; \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-bin-2.35-r0.apk &amp;&amp; \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-i18n-2.35-r0.apk &amp;&amp; \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    apk add glibc-bin-2.35-r0.apk glibc-i18n-2.35-r0.apk glibc-2.35-r0.apk &amp;&amp; \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    rm -rfv glibc-bin-2.35-r0.apk glibc-i18n-2.35-r0.apk glibc-2.35-r0.apk</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#6A737D;--shiki-dark:#7F848E;--shiki-light-font-style:inherit;--shiki-dark-font-style:italic\\"># locale.md 见下面的内容</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#61AFEF\\">COPY</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> ./locale.md /locale.md</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#61AFEF\\">RUN</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> cat locale.md | xargs -i /usr/glibc-compat/bin/localedef -i {} -f UTF-8 {}.UTF-8 &amp;&amp; \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    rm -rfv locale.md</span></span>\\n<span class=\\"line\\"></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#D73A49;--shiki-dark:#61AFEF\\">ENV</span><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\"> LANG=en_US.UTF-8 \\\\</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#24292E;--shiki-dark:#ABB2BF\\">    LANGUAGE=en_US.UTF-8</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{c as comp,o as data};