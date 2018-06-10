function drawSpecial(a)
{
	switch(a)
	{
		case 1:
			//Młot
			graph.push("color red")
		graph.push("0.9x+7 for (-6.11,-3)")//			
		graph.push("0.9x+4 for (-4.444,0)")//			
		graph.push("-0.1x+4 for (-3,0)")//			
		graph.push("-0.9x-4 for (-6.11,-4.444)")//		
		//Rekojesc mlota
		graph.push("-0.9x-1 for (-2.777,5)")//			
		graph.push("-0.9x+1 for (-1.666,6.11)")//			
		graph.push("0.9x-10 for (5,6.11)")//			
			
			//Ostrze sierpa		
		graph.push("((-0.84x+5)/0.125)^0.5 for (0,10)")//			
		graph.push("((-1.2x+4.8)/0.12)^0.5 for (0,10)")//
		
		graph.push("-(36-x^2)^0.5 for (-4,3.95)")//			
		graph.push("-(36-x^2)^0.5 for (4.9,10)")//		
		graph.push("-(17-x^2)^0.5 for (-2.8,2.5)")//			
		graph.push("-(16-x^2)^0.5 for (3.4,10)")//			
		//rekojesc sierpu
		graph.push("1.3x+0.7 for (-5.9,-2.8)")//			
		graph.push("1.3x-2 for (-4.5,-2.7)")//			
		graph.push("-0.7x-11 for (-5.9,-4.5)")//	-4.5
		graph.push("end color red")
            refreshGraph()
		//graph.push("((-1.7x+10)/0.06)^0.5 for (0,10)")//			
		//graph.push("-(abs(-x+10)/0.06)^0.5 for (0,5.92)")//		
		
break		
	case 2:
	graph.push("color red")
	graph.push("(1-(abs(x)-1)^2)^0.5")
	graph.push("-3(1-abs(x)^0.5/2^0.5)^0.5")
	graph.push("end color red")
        refreshGraph()
	break
	}
}
/*
{
0.9x+7 for (-6.11,-3) ,
0.9x+4 for (-4.444,0) ,
-0.1x+4 for (-3,0),
-0.9x-4 for (-6.11,-4.444)	,
-0.9x-1 for (-2.777,5)		,
-0.9x+1 for (-1.666,6.11)	,	
0.9x-10 for (5,6.11)		,
((-0.84x+5)/0.125)^0.5 for (0,10),
((-1.2x+4.8)/0.12)^0.5 for (0,10),
-(36-x^2)^0.5 for (-4,3.95),
-(36-x^2)^0.5 for (4.9,10),
-(17-x^2)^0.5 for (-2.8,2.5),			
-(16-x^2)^0.5 for (3.4,10)	,	
1.3x+0.7 for (-5.9,-2.8)	,		
1.3x-2 for (-4.5,-2.7)		,	
-0.7x-11 for (-5.9,-4.5)
}*/