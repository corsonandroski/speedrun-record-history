# speedrun-record-history
Charting the history of world record contenders using the speedrun.com API

## example data
/example-data contains the complete leaderboard returned from `GET https://www.speedrun.com/api/v1/leaderboards/smw/category/96_Exit`

## chart overview
Inspiration for the project comes from Summoning Salt's world record histories, which have recently included charts like this: https://youtu.be/TdT48yTycfg?t=2988
<br>
This app will produce interactive charts like this for any run. The goal isn't just to make this data more accessible, but to chart it in a way that produces data-driven storytelling. This approach will involve focusing on runners just as much as overall records. Instead of only charting the world record as it advances, the app will identify all runners who were closeley competing for the record at any given time, and compare their progression alongside others.
<br>
This approach will highlight:
-overall record progression
-individual progression, from a runners humble first attempts up to their record breaking run
-rivalries, where multiple users are in close competition
-new routes/tech that enable large leaps in record progression (community annotation features would be especially useful here)
<br>