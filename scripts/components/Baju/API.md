# Baju API
## Baju Service/Model
properties
    <_key_>
        type        ''          // Input types: text, password, datetime, datetime-local, date, month,time, week, number, email, url, search, tel,color
        accept      ''          // only use when type == 'file'
        value       ''          // can also be in format == {1:true, 2:false, ..}
        rows        ''          // only use when type == 'textarea'
        options     []          // should be in format == [{}, {}, ..]
        selected    ''          // only use when type == 'select' and should be in format {} same as selected options
        hide        true/false  // visibility on template default false
        disabled    true/false  // disabled input by default
        required    true/false  // add * to label if true, default is false
        onChange    function    // define function to be executed when input field has changes
    
    Email
        type        'email'
        onChange    function
    Password
        type        'password'
        onChange    function

## Baju Controller
title      $state.current.data.title
debugging  $state.current.data.debugging
model      Baju
    
style
    imageClassWidth: 3
    labelClassWidth: 3
    inputClassWidth: 9
    
onClick = function(actionName)