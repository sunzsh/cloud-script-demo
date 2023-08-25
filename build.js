
var fs = require('fs');
const readline = require('readline');
const os = require('os');

const srcDir = './src';

function buildBtn(func, btnIndex, parentName) {
  return `
    const btn${btnIndex} = document.createElement('button');
    btn${btnIndex}.innerHTML = '${func.name}';
    btn${btnIndex}.style.paddingLeft = '12px';
    btn${btnIndex}.style.paddingRight = '12px';
    btn${btnIndex}.style.width = '';
    btn${btnIndex}.style.height = '30px';
    btn${btnIndex}.onclick = function() {
      ${func.content}
    }
    ${parentName}.appendChild(btn${btnIndex});`
}

async function main() {
  const modules = await fs.promises.readdir(srcDir);
  fs.rmSync('./dist', { recursive: true, force: true });
  fs.mkdirSync(`./dist`);

  for (const module of modules) {
    const file = fs.lstatSync(`${srcDir}/${module}`)
    if(!file.isDirectory()) {
      continue;
    }
    const functions = [];
    const funcs = await fs.promises.readdir(`${srcDir}/${module}`)
    for (const funFileName of funcs) {
      let func = { name: funFileName.replace('.js', '') };
      func.content = fs.readFileSync(`${srcDir}/${module}/${funFileName}`, 'utf8');
      functions.push(func);
    }

    let content = 
`(function(){
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
    ${functions.map((func, index) => buildBtn(func, index + 1, 'tool_panel')).join(os.EOL)}

    document.body.appendChild(tool_panel);
  }
})()`
    fs.promises.writeFile(`./dist/${module}.js`,content, 'utf-8')

    const installScript = `javascript:(function(){if(window.bmscript_tool_panel){window.bmscript_tool_panel.parentNode.removeChild(window.bmscript_tool_panel);delete window.bmscript_tool_panel;return;}const _tmp_script = document.createElement("script");_tmp_script.type = "text/javascript";_tmp_script.src="${process.env.npm_package_webroot}/project1.js";document.getElementsByTagName('HEAD').item(0).appendChild(_tmp_script);})()`
    console.log(`${module}：${os.EOL}${installScript}${os.EOL}`);
  }
} 


main()