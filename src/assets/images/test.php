<?php
    $DB_HostName = "209.17.116.155";
    $DB_Name = "up2speed";
    $DB_User = "benhorton2ms";
	$DB_Pass = "Annabar1!";
	$DB_Table = "up2speed_roller_sessions";
	$con = mysql_connect($DB_HostName,$DB_User,$DB_Pass) or die(mysql_error()); 
	mysql_select_db($DB_Name,$con) or die(mysql_error()); 
	$email = $_REQUEST['email'];
    $body_part_id = $_REQUEST['bodypartid'];
	$con = mysql_connect($DB_HostName,$DB_User,$DB_Pass) or die(mysql_error()); 
	mysql_select_db($DB_Name,$con) or die(mysql_error()); 
         
        $sql = ("SELECT rs.session_id, session_date, rs.body_part_id, rs.email, rs.minutes, rs.reps, rs.pain_before, rs.notes,rs.pain_after, rs.favorite,rs.cooloff, bp.body_part, et.exercise_type_description FROM up2speed_roller_sessions rs, up2speed_body_parts bp, exercise_type et WHERE  rs.email =  '$email' AND rs.body_part_id = $body_part_id AND rs.body_part_id = bp.body_part_id AND et.exercise_type_id = rs.exercise_type_id GROUP BY body_part, session_id, email, pain_before, pain_after, minutes, reps, body_part_id, exercise_type_description");
        
        $result = mysql_query($sql) or die ("Query error ". mysql_error());
        $records = array();
        $items = array();
        $mysessionid = "";
        $bodyparts = "abs";
        $items = array(); 
        while($row = mysql_fetch_assoc($result)) {

          if ($row['session_id']  != $mysessionid ) {
               if($row['body_part'] != $bodyparts){
                   $bodyparts = $row['body_part'];
                }
               
                $items[]= array('session_id'=>$row['session_id'],'body_part'=>$row['body_part'],'body_part_id'=>$row['body_part_id'],'notes'=>$row['notes'],'email'=>$row['email'],'favorite'=>$row[favorite],'repetition'=>$row[reps],'sessioin_date'=>$row[session_date],'cooloff'=>$row['cooloff'],'pain_before'=>$row['pain_before'],'pain_after'=>$row['pain_after'],'minutes'=>$row['minutes'],'exercise_type'=>$row['exercise_type_description']);
                $mysessionid = $row['session_id'];
           }
        }
        $records[]= array("body_part"=>$bodyparts,"items"=>$items); 
        echo json_encode($records);
?>