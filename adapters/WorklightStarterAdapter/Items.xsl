<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text"/>
<xsl:template match="/rss">
	{
		items : [
			<xsl:for-each select="channel/item">
				{
					title : '<xsl:value-of select="title"/>',
					link : '<xsl:value-of select="link"/>',
					pubDate : '<xsl:value-of select="pubDate"/>',
					description : '<xsl:value-of select="description"/>'
				},
			</xsl:for-each>
		]
	}
</xsl:template>
</xsl:stylesheet>