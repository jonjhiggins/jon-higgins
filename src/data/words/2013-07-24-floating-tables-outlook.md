---
layout: post
title: Getting tables to float in Outlook 2007 - 2013&#58; a Checklist
description: A debugging checklist for when Outlook decides it won't float your tables in responsive email designs.
category: words
tags: [email design, outlook, responsive, microsoft ruining my life]
---

When designing responsive email templates it's a common requirement to "float" two items next to each other. The process of aligning tables left or right to simulate floating elements is described in [this Email on Acid blog post](http://www.emailonacid.com/blog/details/C13/removing_unwanted_spacing_or_gaps_between_tables_in_outlook_2007_2010).

<p class="has-pullquote" data-pullquote="as the template grows in complexity things end up causing Outlook to not float them">I've found that easy to follow for simple designs, but as the template gets edited over time and grows in complexity things end up throwing out the tables and causing Outlook to not float them. In order to debug these issues I've found the following checklist useful:</p>

### 1. Parent table of floated tables must have a width set 

``` html
<table cellpadding="0" cellspacing="0" border="0" width="480">
```
	
### 2. Floated tables must have: 

- style attributes `mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: collapse;`
- a width set (reduce every other table by one pixel to allow for the `mso-border-right-alt` in step 3).
- align="left".

``` html
<table cellpadding="0" cellspacing="0" border="0" style="mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: collapse;" width="239" align="left">
```

### 3. Floated tables should only have one child &lt;td&gt;, which has a 'mso-border-right-alt' applied to it 

``` html
<td style="border: none; mso-border-right-alt: solid #FFFFFF .5pt; border-collapse: collapse;">
```

4. All the content in the child &lt;td&gt; is wrapped in a `<div>` with more Outlook specific styles.

``` html	
<div style="mso-table-lspace: 0; mso-table-rspace: 0;">
```	
	
## Altogether....

Note that the 1st floated table is 239px wide - to allow for the `mso-border-right-alt` applied to the child &lt;td&gt;s

``` html
<table cellpadding="0" cellspacing="0" border="0" width="480">
	<tr>
		<td>
			<table cellpadding="0" cellspacing="0" border="0" style="mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: collapse;" width="239" align="left"  bgcolor="#CCCCCC">
				<tr>
					<td style="mso-border-right-alt: solid #FFFFFF .5pt;">
						<div style="mso-table-lspace: 0; mso-table-rspace: 0;">Left content</div>
					</td>
				</tr>
			</table>
			<table cellpadding="0" cellspacing="0" border="0" style="mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: collapse;" width="240" align="left"  bgcolor="#999999">
				<tr>
					<td style="mso-border-right-alt: solid #FFFFFF .5pt;">
						<div style="mso-table-lspace: 0; mso-table-rspace: 0;">Right content</div>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
```


