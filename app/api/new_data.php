<?php
    $_POST["customer"] = "test_01";
    $_POST["assembly"] = "test_02";
    $_POST["date_received"] = "test_03";
    $_POST["time_received"] = "test_04";
    $_POST["date_completed"] = "test05";
    $_POST["time_completed"] = "test_06";
    
    function input_string_valid($str){
        return isset($str) && !empty($str);
    }
    function input_string_escape($inp) { 
        if(is_array($inp))  return array_map(__METHOD__, $inp);
    
        if(input_string_valid($inp)) { 
            return str_replace(
                array('\\', "\0", "\n", "\r", "'", '"', "\x1a"),
                array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), 
                $inp
            );
        }
        return $inp; 
    }

    $t_string_array = [   
        "customer", 
        "assembly", 
        "date_received", 
        "time_received", 
        "date_completed",
        "time_completed"
    ];
    
    foreach ($t_string_array as $v) {
        if ( input_string_valid( (string)$_POST[$v] ) )
            $t_new_entry[$v] = input_string_escape($_POST[$v]);
    }
    print_r($t_new_entry);
    $t_json_string = file_get_contents("data.json");
    $t_json_arr = json_decode($t_json_string);
    $t_new_data_arr = array_merge($t_new_entry, $t_json_arr);
    print_r($t_json_arr);
    print_r($t_new_data_arr);
    