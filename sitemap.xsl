<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html><head><meta charset="utf-8"/><title>Sitemap — buy-wego6.com</title>
<style>
 body{font:15px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;margin:0;
   background:#FFF7F0;color:#331B27}
 .wrap{max-width:1000px;margin:0 auto;padding:40px 20px 70px}
 h1{font-size:30px;margin:0 0 6px} .sub{color:#5C4250;margin:0 0 26px}
 table{border-collapse:collapse;width:100%;background:#fff;border-radius:14px;overflow:hidden;
   box-shadow:0 10px 30px rgba(51,27,39,.08)}
 th{background:#FFE9D8;text-align:left;font-size:12px;letter-spacing:.08em;text-transform:uppercase;
   padding:12px 14px;color:#5C4250}
 td{padding:11px 14px;border-top:1px solid #FFE9D8;font-size:14px}
 a{color:#C2410C;text-decoration:none} a:hover{text-decoration:underline}
 .pill{background:#FFF1DC;border-radius:999px;padding:2px 9px;font-size:12px;color:#5C4250}
</style></head><body><div class="wrap">
<h1>Sitemap</h1>
<p class="sub"><xsl:value-of select="count(s:urlset/s:url)"/> pages</p>
<table><tr><th>URL</th><th>Languages</th><th>Updated</th></tr>
<xsl:for-each select="s:urlset/s:url">
<tr><td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
<td><span class="pill"><xsl:value-of select="count(xhtml:link)"/></span></td>
<td><xsl:value-of select="s:lastmod"/></td></tr>
</xsl:for-each>
</table></div></body></html>
</xsl:template></xsl:stylesheet>
