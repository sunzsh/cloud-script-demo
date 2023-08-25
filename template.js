(function(){
  if (window.bmscript_tool_panel) {
    if (window.bmscript_tool_panel.style.display === 'none') {
      window.bmscript_tool_panel.style.display = 'block';
    } else {
      window.bmscript_tool_panel.style.display = 'none';
    }
  } else {
    const tool_panel = document.createElement('div');
    tool_panel.id = 'bmscript_tool_panel';
    tool_panel.style.backgroundColor = 'red';
    tool_panel.style.position = 'fixed';
    tool_panel.style.opacity = '0.9';
    tool_panel.style.borderRadius = '4px';
    tool_panel.style.top = '12px';
    tool_panel.style.right = '12px';
    tool_panel.style.padding = '12px';
    tool_panel.style.display = 'flex';
    tool_panel.style.zIndex = 99999999;
    
    const btn1 = document.createElement('button');
    btn1.innerHTML = 'func1';
    btn1.style.paddingLeft = '12px';
    btn1.style.paddingRight = '12px';
    btn1.style.width = '';
    btn1.style.height = '30px';
    btn1.onclick = function() {
      alert('test')
    }
    tool_panel.appendChild(btn1);

    const btn2 = document.createElement('button');
    btn2.innerHTML = 'func2';
    btn2.style.paddingLeft = '12px';
    btn2.style.paddingRight = '12px';
    btn2.style.width = '';
    btn2.style.height = '30px';
    btn2.onclick = function() {
      alert('test222')
    }
    tool_panel.appendChild(btn2);

    document.body.appendChild(tool_panel);
  }
})()