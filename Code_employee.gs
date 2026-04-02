var SPREADSHEET_ID = "";
var SHEET_KARYAWAN = "DataKaryawan";
var SHEET_ABSENSI = "AbsensiKaryawan"; 
var SHEET_SETTINGS = "SettingsKaryawan";

function doGet(e) {
  var page = e.parameter.page || "employee";
  var html = buildHtml(page);
  return HtmlService.createHtmlOutput(html).setTitle("Admin LevelUp HR").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
}

function buildHtml(page) {
  var css = getCSS();
  var body = page === "admin" ? getAdminHTML() : getEmployeeHTML();
  var js = page === "admin" ? getAdminJS() + getAdminJS2() + getAdminJS3() + getAdminJS4() : getEmployeeJS();
  return "<!DOCTYPE html><html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'><link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' rel='stylesheet'><script src='https://unpkg.com/lucide@latest'></script><script src='https://unpkg.com/html5-qrcode@2.3.4/html5-qrcode.min.js'></script><script src='https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'></script><script src='https://cdn.jsdelivr.net/npm/chart.js'></script><style>" + css + "</style></head><body>" + body + "<script>" + js + "</script></body></html>";
}

function getCSS() {
    return ":root{--primary:#3b82f6;--primary-dark:#2563eb;--success:#10b981;--warning:#f59e0b;--danger:#ef4444;--info:#06b6d4;--bg:#0f172a;--card-bg:#1e293b;--text:#f8fafc;--text-muted:#94a3b8;--gray:#64748b;--border:#334155;--bg-admin:#f1f5f9;--text-admin:#0f172a}*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Poppins',sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased}button,input,select,textarea,.btn{font-family:'Poppins',sans-serif}.app{display:flex;min-height:100vh;color:var(--text-admin)}.sidebar{display:none;width:260px;background:#fff;border-right:1px solid #e2e8f0;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:50}.sidebar-header{padding:24px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #f1f5f9}.logo-icon{width:40px;height:40px;background:#eff6ff;color:var(--primary);border-radius:10px;display:flex;align-items:center;justify-content:center}.logo-text h1{font-size:18px;font-weight:700;color:#1e293b;line-height:1.2}.logo-text p{font-size:12px;color:#64748b}.nav{padding:24px 16px;flex:1}.nav-item{display:flex;align-items:center;gap:12px;padding:12px 16px;color:#64748b;border-radius:8px;cursor:pointer;margin-bottom:4px;transition:all 0.2s}.nav-item:hover{background:#f8fafc;color:var(--primary)}.nav-item.active{background:#eff6ff;color:var(--primary);font-weight:600}.nav-item i{width:20px;height:20px}.sidebar-footer{padding:20px;border-top:1px solid #f1f5f9}.user{display:flex;align-items:center;gap:12px}.user-avatar{width:36px;height:36px;background:var(--primary);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px}.user-info{font-size:13px;color:#1e293b;font-weight:500}.user-info p{font-size:11px;color:#64748b}.main{flex:1;background:var(--bg-admin);padding:0;display:none;flex-direction:column;color:var(--text-admin)}.topbar{background:#fff;padding:16px 32px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center}.topbar h2{font-size:20px;font-weight:600;color:#1e293b}.topbar-right{display:flex;align-items:center;gap:20px}.search-box{display:flex;align-items:center;gap:10px;background:#f8fafc;padding:8px 16px;border-radius:8px;border:1px solid #e2e8f0}.search-box input{border:none;background:none;outline:none;font-size:14px;color:#1e293b;width:200px}.topbar-icon{width:36px;height:36px;display:flex;align-items:center;justify-content:center;color:#64748b;cursor:pointer;position:relative}.content{padding:32px;width:100%}.page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}.page-header h1{color:#1e293b;font-size:24px;font-weight:700}.header-actions{display:flex;gap:12px}.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px;margin-bottom:32px}.stat-card{background:#fff;padding:24px;border-radius:16px;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.05)}.stat-info h3{font-size:13px;color:#64748b;margin-bottom:8px;font-weight:500}.stat-info .value{font-size:28px;font-weight:700;color:#1e293b}.stat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center}.stat-icon.green{background:#ecfdf5;color:#10b981}.stat-icon.blue{background:#eff6ff;color:#3b82f6}.stat-icon.orange{background:#fff7ed;color:#f59e0b}.stat-icon.red{background:#fef2f2;color:#ef4444}.feed-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.feed-title{font-size:18px;font-weight:600;color:#1e293b}.feed-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px}.feed-card{background:#fff;border-radius:16px;border:1px solid #e2e8f0;display:flex;flex-direction:column;overflow:hidden;transition:transform 0.2s}.feed-card:hover{transform:translateY(-2px);box-shadow:0 4px 6px -1px rgba(0,0,0,0.1)}.feed-img{width:100%;height:220px;background:#f1f5f9;position:relative;overflow:hidden}.feed-photo{width:100%;height:100%;object-fit:cover}.feed-badge{position:absolute;bottom:0;left:0;right:0;font-size:9px;text-align:center;padding:4px;background:rgba(0,0,0,0.7);color:#fff;font-weight:600}.feed-badge.late{background:rgba(239,68,68,0.9)}.feed-badge.verified{background:rgba(16,185,129,0.9)}.feed-info{padding:12px}.feed-name{font-weight:600;color:#1e293b;margin-bottom:2px;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.feed-class{font-size:12px;color:#64748b}.card{background:#fff;border-radius:16px;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.05);overflow:hidden;margin-bottom:24px}.card-body{padding:24px}.table{width:100%;border-collapse:collapse}.table th{text-align:left;padding:12px 16px;font-size:12px;color:#64748b;font-weight:600;border-bottom:1px solid #e2e8f0;text-transform:uppercase;letter-spacing:0.5px}.table td{padding:16px;font-size:14px;color:#334155;border-bottom:1px solid #f1f5f9}.table tr:last-child td{border-bottom:none}.student-cell{display:flex;align-items:center;gap:12px}.avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:#fff}.avatar.blue{background:#3b82f6}.avatar.green{background:#10b981}.avatar.orange{background:#f59e0b}.avatar.purple{background:#8b5cf6}.avatar.cyan{background:#06b6d4}.badge{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600}.badge-success{background:#ecfdf5;color:#10b981}.badge-warning{background:#fff7ed;color:#f59e0b}.badge-danger{background:#fef2f2;color:#ef4444}.badge-info{background:#eff6ff;color:#3b82f6}.btn{padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:8px;transition:0.2s}.btn-primary{background:var(--primary);color:#fff}.btn-primary:hover{background:var(--primary-dark)}.btn-success{background:var(--success);color:#fff}.btn-warning{background:var(--warning);color:#fff}.btn-outline{background:#fff;border:1px solid #e2e8f0;color:#475569}.action-btn{width:32px;height:32px;border-radius:8px;border:1px solid #e2e8f0;background:#fff;color:#64748b;display:flex;align-items:center;justify-content:center;cursor:pointer}.action-btn:hover{background:#fee2e2;color:#ef4444;border-color:#fee2e2}.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:none;align-items:center;justify-content:center;z-index:999;backdrop-filter:blur(2px)}.modal-overlay.active{display:flex}.modal{background:#fff;width:100%;max-width:400px;border-radius:16px;overflow:hidden;animation:slideUp 0.3s cubic-bezier(0.16,1,0.3,1);z-index:1000;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)}.modal.active{display:block}.modal-header{padding:16px 20px;border-bottom:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center}.modal-title{font-weight:600;color:#1e293b}.modal-close{background:none;border:none;font-size:24px;color:#94a3b8;cursor:pointer}.modal-body{padding:20px}.form-group{margin-bottom:16px}.form-label{display:block;font-size:13px;font-weight:500;color:#64748b;margin-bottom:6px}.form-input{width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-family:inherit;font-size:14px;color:#1e293b}.form-input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 3px rgba(59,130,246,0.1)}@keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}@media(min-width:769px){.sidebar{display:flex}.main{display:flex;margin-left:260px}.mobile-app{display:none}.app-header,.bottom-nav{display:none}}.toast-container{position:fixed;bottom:20px;right:20px;display:flex;flex-direction:column;gap:10px;z-index:200}.toast{background:#1e293b;color:#fff;padding:12px 20px;border-radius:8px;font-size:13px;display:flex;align-items:center;gap:10px;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);animation:slideIn 0.3s}.toast.success{background:#10b981}.toast.error{background:#ef4444}@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}/* Mobile App Specifics */.mobile-app{max-width:480px;margin:0 auto;background:var(--bg);min-height:100vh;position:relative;display:flex;flex-direction:column;color:#fff}.app-header{padding:20px 24px;display:flex;justify-content:space-between;align-items:center}.app-logo{display:flex;align-items:center;gap:12px}.logo-box{width:40px;height:40px;background:rgba(59,130,246,0.1);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--primary)}.header-actions{display:flex;gap:12px}.icon-btn{width:40px;height:40px;background:var(--card-bg);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--text);border:1px solid var(--border)}.time-section{text-align:center;margin:20px 0}.digital-clock{font-size:48px;font-weight:700;line-height:1;letter-spacing:-1px}.date-text{color:var(--text-muted);font-size:14px;margin-top:5px}.scan-container{position:relative;margin:20px auto;width:280px;height:280px;display:flex;align-items:center;justify-content:center}.scan-circle{width:100%;height:100%;border-radius:50%;border:2px solid var(--border);position:relative;overflow:hidden;background:#000;box-shadow:0 0 50px rgba(59,130,246,0.2)}.camera-video{width:100%;height:100%;object-fit:cover;transform:scaleX(-1)}.scan-overlay{position:absolute;top:0;left:0;right:0;bottom:0;border-radius:50%;border:2px solid var(--primary);box-shadow:inset 0 0 20px rgba(59,130,246,0.5);z-index:10}.scan-line{position:absolute;width:100%;height:2px;background:var(--primary);box-shadow:0 0 10px var(--primary);top:50%;animation:scan 2s infinite ease-in-out;z-index:11}@keyframes scan{0%{top:10%;opacity:0}50%{opacity:1}100%{top:90%;opacity:0}}.gps-badge{position:absolute;bottom:-40px;left:50%;transform:translateX(-50%);background:var(--card-bg);padding:6px 16px;border-radius:20px;display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;border:1px solid var(--border);z-index:20;color:var(--text-muted);white-space:nowrap;width:auto}.gps-badge.locked{background:rgba(16,185,129,0.2);color:var(--success);border-color:rgba(16,185,129,0.3)}.scan-status{text-align:center;margin-top:50px;color:var(--text-muted);font-size:13px}.location-card{margin:20px;background:var(--card-bg);border-radius:20px;padding:20px;border:1px solid var(--border)}.loc-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted)}.map-view{height:100px;background:#334155;border-radius:12px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.map-pin-anim{width:20px;height:20px;background:var(--primary);border-radius:50%;border:3px solid white;box-shadow:0 0 20px var(--primary)}.bottom-nav{position:fixed;bottom:0;left:0;right:0;background:var(--card-bg);padding:15px 30px;display:flex;justify-content:space-between;border-top:1px solid var(--border);max-width:480px;margin:0 auto}.nav-icon{display:flex;flex-direction:column;align-items:center;gap:4px;color:var(--text-muted);font-size:10px}.nav-icon.active{color:var(--primary)}.input-screen{padding:40px 30px;display:flex;flex-direction:column;justify-content:center;min-height:80vh}.welcome-text{font-size:28px;font-weight:700;margin-bottom:10px}.welcome-sub{color:var(--text-muted);margin-bottom:40px}";
}


function getAdminHTML() {
  return "<div class='app'><aside class='sidebar'><div class='sidebar-header'><div class='logo-icon'><i data-lucide='briefcase' style='width:22px;height:22px'></i></div><div class='logo-text'><h1>Admin LevelUp</h1><p>HR Portal</p></div></div><nav class='nav'><div class='nav-item active' data-page='dashboard' onclick='showPage(\"dashboard\")'><i data-lucide='home'></i><span>Dashboard</span></div><div class='nav-item' data-page='laporan' onclick='showPage(\"laporan\")'><i data-lucide='clipboard-check'></i><span>Laporan Absensi</span></div><div class='nav-item' data-page='karyawan' onclick='showPage(\"karyawan\")'><i data-lucide='users'></i><span>Data Karyawan</span></div><div class='nav-item' data-page='pengaturan' onclick='showPage(\"pengaturan\")'><i data-lucide='settings'></i><span>Pengaturan</span></div></nav><div class='sidebar-footer'><div class='user'><div class='user-avatar'>HR</div><div class='user-info'>Admin HR<p>LevelUp Inc</p></div></div></div></aside><main class='main'><div class='topbar'><h2 id='page-title'>Dashboard</h2><div class='topbar-right'><div class='search-box'><i data-lucide='search' style='width:16px;color:var(--gray)'></i><input type='text' placeholder='Cari karyawan...'></div><div class='topbar-icon'><i data-lucide='bell' style='width:20px'></i></div></div></div><div class='content' id='main-content'></div></main></div><div class='modal-overlay' id='modal'></div><div class='toast-container' id='toasts'></div>";
}



function getAdminJS() {
  var js = "";
  js += "var currentPage='dashboard';var employees=[];var attendance=[];var stats={};var appSettings={jamMasuk:'08:00',jamPulang:'17:00'};var filterDivisi='Semua';var colors=['blue','green','orange','purple','cyan'];";
  js += "document.addEventListener('DOMContentLoaded',function(){lucide.createIcons();loadData();});";
  js += "function loadData(){";
  js += "google.script.run.withSuccessHandler(function(r){if(r.success)stats=r.stats;renderPage();}).withFailureHandler(function(e){alert('Err Stats:'+e);}).getStats();";
  js += "google.script.run.withSuccessHandler(function(r){if(r.success)appSettings=r.data;}).getSettings();"; 
  js += "google.script.run.withSuccessHandler(function(r){if(r.success){attendance=r.attendance;renderPage();}else{alert('Server Error: '+r.message);}}).withFailureHandler(function(e){alert('Connection Error: '+e);}).getAttendanceLog();";
  js += "google.script.run.withSuccessHandler(function(r){if(r.success)employees=r.employees;renderPage();}).getEmployeeList();}";
  
  js += "function getColor(i){return colors[i%colors.length];}";
  js += "function getInit(n){if(!n)return'';var p=n.split(' ');if(p.length===1)return p[0].substring(0,2).toUpperCase();return(p[0][0]+p[1][0]).toUpperCase();}";
  js += "function showPage(p){currentPage=p;document.querySelectorAll('.nav-item').forEach(function(n){n.classList.remove('active');});document.querySelector('[data-page=\"'+p+'\"]').classList.add('active');var t={'dashboard':'Dashboard','laporan':'Laporan Absensi','karyawan':'Data Karyawan','pengaturan':'Pengaturan'};document.getElementById('page-title').textContent=t[p];renderPage();}";
  js += "function renderPage(){if(currentPage==='dashboard')renderDashboard();else if(currentPage==='laporan')renderLaporan();else if(currentPage==='karyawan')renderKaryawan();else if(currentPage==='pengaturan')renderPengaturan();}";
  
  js += "function renderDashboard(){var c=document.getElementById('main-content');";
  js += "var performanceHtml = '';";
  js += "if(stats.topRajin && stats.topRajin.length > 0) {";
  js += "performanceHtml += '<div class=\"card\" style=\"grid-column:1/-1\"><div style=\"padding:16px 20px;display:flex;align-items:center;gap:8px\"><i data-lucide=\"trophy\" style=\"width:20px;color:#f59e0b\"></i><strong>Top 5 Karyawan Paling Rajin</strong></div><div class=\"card-body\" style=\"padding-top:0\"><div class=\"feed-grid\" style=\"grid-template-columns:repeat(5, 1fr)\">';";
  js += "stats.topRajin.forEach(function(k, i){";
  js += "var ph='<div style=\"width:48px;height:48px;margin:0 auto 10px;background:#f1f5f9;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#64748b;overflow:hidden\">';";
  js += "if(k.foto) ph+='<img src=\"'+k.foto+'\" style=\"width:100%;height:100%;object-fit:cover\" onerror=\"this.style.display=\\'none\\'\">';";
  js += "else ph+='<i data-lucide=\"user\" style=\"width:24px\"></i>';";
  js += "ph+='</div>';";
  js += "performanceHtml += '<div style=\"text-align:center\">'+ph+'<div style=\"font-weight:600;font-size:13px\">'+k.nama+'</div><div style=\"font-size:11px;color:var(--gray)\">'+k.divisi+'</div><span class=\"badge badge-success\" style=\"margin-top:5px\">'+k.hadir+' Hadir</span></div>';";
  js += "});";
  js += "performanceHtml += '</div></div></div>';";
  js += "}";
  
  js += "var feed='';if(attendance.length>0){";
  // Filter for dashboard to only show recent 10 items to avoid flooding
  js += "var recent=attendance.slice().reverse().slice(0,10);";
  js += "for(var j=0;j<recent.length;j++){var a=recent[j];var isLate=a.statusMasuk==='Terlambat';";
  js += "var badgeM=a.jamMasuk? '<span class=\"feed-badge '+ (isLate?'late':'verified') +'\">MASUK ' + a.jamMasuk + '</span>' : '';";
  js += "var badgeP=a.jamPulang? '<span class=\"badge badge-info\" style=\"position:absolute;top:12px;right:12px\">PULANG '+a.jamPulang+'</span>' : '';";
  js += "var photoSrc=a.fotoMasuk?a.fotoMasuk:'';";
  js += "var placeholder='<div class=\"feed-photo\" style=\"display:flex;align-items:center;justify-content:center;background:#f1f5f9;color:#94a3b8\"><i data-lucide=\"user\" style=\"width:24px\"></i></div>';";
  js += "var photoHtml=photoSrc?'<img class=\"feed-photo\" src=\"'+photoSrc+'\" onerror=\"this.parentElement.innerHTML=\\''+placeholder.replace(/\"/g, '&quot;')+'\\'\">':placeholder;";
  js += "feed+='<div class=\"feed-card\"><div class=\"feed-img\">'+photoHtml+badgeM+badgeP+'</div><div class=\"feed-info\"><div class=\"feed-name\">'+a.nama+'</div><div class=\"feed-class\">'+a.divisi+'</div></div></div>';}}";
  js += "else{feed='<div style=\"text-align:center;padding:40px;color:var(--gray);grid-column:1/-1\">Belum ada data absensi hari ini</div>';}";
  
  js += "var statsHtml = '<div class=\"stats-grid\">';";
  js += "statsHtml += '<div class=\"stat-card\"><div class=\"stat-info\"><h3>Hadir Hari Ini</h3><div class=\"value\">'+(stats.totalHadir||0)+'</div></div><div class=\"stat-icon green\"><i data-lucide=\"user-check\"></i></div></div>';";
  js += "statsHtml += '<div class=\"stat-card\"><div class=\"stat-info\"><h3>Sudah Pulang</h3><div class=\"value\">'+(stats.totalPulang||0)+'</div></div><div class=\"stat-icon blue\"><i data-lucide=\"log-out\"></i></div></div>';";
  js += "statsHtml += '<div class=\"stat-card\"><div class=\"stat-info\"><h3>Terlambat</h3><div class=\"value\">'+(stats.totalTerlambat||0)+'</div></div><div class=\"stat-icon orange\"><i data-lucide=\"clock\"></i></div></div>';";
  js += "statsHtml += '<div class=\"stat-card\"><div class=\"stat-info\"><h3>Tidak Masuk</h3><div class=\"value\">'+(stats.belumAbsen||0)+'</div></div><div class=\"stat-icon red\"><i data-lucide=\"user-x\"></i></div></div></div>';";
  
  js += "c.innerHTML=statsHtml + performanceHtml + '<div class=\"card\" style=\"grid-column:1/-1\"><div style=\"padding:16px 20px;display:flex;align-items:center;gap:8px\"><i data-lucide=\"bar-chart-2\" style=\"width:20px;color:var(--primary)\"></i><strong>Statistik Kehadiran Bulanan</strong></div><div class=\"card-body\"><canvas id=\"attChart\" style=\"max-height:300px\"></canvas></div></div>' + '<div class=\"feed-header\"><div class=\"feed-title\">Live Feed Karyawan</div><button class=\"btn btn-primary\" onclick=\"loadData()\"><i data-lucide=\"refresh-cw\" style=\"width:14px\"></i> Refresh</button></div><div class=\"feed-grid\">'+feed+'</div>';lucide.createIcons();renderChart(stats.monthly);}";
  js += "function renderChart(data){if(!data)return;var ctx=document.getElementById('attChart');new Chart(ctx,{type:'bar',data:{labels:data.labels,datasets:[{label:'Hadir',data:data.hadir,backgroundColor:'#10b981',borderRadius:4},{label:'Alfa (Tidak Hadir)',data:data.alfa,backgroundColor:'#ef4444',borderRadius:4}]},options:{responsive:true,plugins:{legend:{position:'top'}},scales:{y:{beginAtZero:true}}}});}";
  return js;
}

function getAdminJS2() {
  var js = "";
  js += "var filterDate='';";
  js += "function renderLaporan(){var c=document.getElementById('main-content');c.innerHTML='<div class=\"page-header\"><h1>Laporan Absensi</h1><div class=\"header-actions\"><input type=\"date\" class=\"form-input\" style=\"width:auto\" onchange=\"filterLaporan(this.value)\" id=\"date-filter\"><button class=\"btn btn-success\" onclick=\"exportExcel()\"><i data-lucide=\"file-spreadsheet\" style=\"width:16px\"></i> Excel</button><button class=\"btn btn-danger\" style=\"background:var(--danger);color:white\" onclick=\"exportPDF()\"><i data-lucide=\"file-text\" style=\"width:16px\"></i> PDF</button></div></div><div class=\"card\"><div class=\"card-body\"><table class=\"table\"><thead><tr><th>Karyawan</th><th>Divisi</th><th>Tanggal</th><th>Masuk</th><th>Pulang</th><th>Status Masuk</th><th>Status Pulang</th></tr></thead><tbody id=\"lap-table\"><tr><td colspan=\"7\" style=\"text-align:center;padding:30px;color:var(--gray)\">Loading data...</td></tr></tbody></table></div></div>';lucide.createIcons();renderLapTable();}";
  js += "function filterLaporan(d){filterDate=d;renderLapTable();}";
  js += "function renderLapTable(){var tb=document.getElementById('lap-table');if(!tb)return;";
  // FILTERING LOGIC
  js += "var list=attendance.slice().reverse();";
  js += "if(filterDate){list=list.filter(function(a){return a.tanggal===filterDate;});}";
  js += "if(!list || list.length === 0){tb.innerHTML='<tr><td colspan=\"7\" style=\"text-align:center;padding:30px;color:var(--gray)\">Data Absensi Kosong / Tidak Ditemukan</td></tr>';return;}";
  js += "var h='';";
  js += "for(var i=0;i<list.length;i++){var a=list[i];";
  js += "var st=a.statusMasuk==='Terlambat'?'<span class=\"badge badge-warning\">Terlambat</span>':'<span class=\"badge badge-success\">Tepat Waktu</span>';";
  js += "var stP=a.statusPulang? (a.statusPulang.includes('Lembur')?'<span class=\"badge badge-info\">'+a.statusPulang+'</span>':'<span class=\"badge badge-success\">'+a.statusPulang+'</span>') : '-';";
  js += "h+='<tr><td><div class=\"student-cell\"><div class=\"avatar '+getColor(i)+'\">'+getInit(a.nama)+'</div><span style=\"font-weight:500\">'+a.nama+'</span></div></td><td>'+a.divisi+'</td><td>'+a.tanggal+'</td><td>'+(a.jamMasuk||'-')+'</td><td>'+(a.jamPulang||'-')+'</td><td>'+st+'</td><td>'+stP+'</td></tr>';}tb.innerHTML=h;lucide.createIcons();}";
  
  js += "function exportExcel(){";
  js += "var list=attendance.slice().reverse(); if(filterDate) list=list.filter(function(a){return a.tanggal===filterDate;});";
  js += "if(list.length===0){alert('Tidak ada data untuk diexport');return;}";
  js += "var data=list.map(function(item){return {'Nama':item.nama,'Divisi':item.divisi,'Tanggal':item.tanggal,'Jam Masuk':item.jamMasuk,'Jam Pulang':item.jamPulang,'Status Masuk':item.statusMasuk,'Status Pulang':item.statusPulang};});";
  js += "var ws=XLSX.utils.json_to_sheet(data);var wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,'Laporan');XLSX.writeFile(wb,'Laporan_Absensi_'+(filterDate||'All')+'.xlsx');}";

  js += "function exportPDF(){";
  js += "var list=attendance.slice().reverse(); if(filterDate) list=list.filter(function(a){return a.tanggal===filterDate;});";
  js += "if(list.length===0){alert('Tidak ada data untuk diexport');return;}";
  js += "var { jsPDF } = window.jspdf; var doc = new jsPDF();";
  js += "doc.text('Laporan Absensi Karyawan', 14, 15);";
  js += "doc.setFontSize(10); doc.text('Tanggal: ' + (filterDate||'Semua Data'), 14, 22);";
  js += "var headers = [['Nama', 'Divisi', 'Tanggal', 'Masuk', 'Pulang', 'Sts Masuk', 'Sts Pulang']];";
  js += "var data = list.map(function(a){ return [a.nama, a.divisi, a.tanggal, a.jamMasuk||'-', a.jamPulang||'-', a.statusMasuk, a.statusPulang||'-']; });";
  js += "doc.autoTable({ head: headers, body: data, startY: 30, theme: 'grid', styles: { fontSize: 8 } });";
  js += "doc.save('Laporan_Absensi_'+(filterDate||'All')+'.pdf');}";

  return js;
}

function getAdminJS3() {
  var js = "";
  js += "function renderKaryawan(){var c=document.getElementById('main-content');c.innerHTML='<div class=\"page-header\"><h1>Data Karyawan</h1><div class=\"header-actions\"><button class=\"btn btn-primary\" onclick=\"showAddModal()\"><i data-lucide=\"plus\" style=\"width:16px\"></i> Tambah Karyawan</button><button class=\"btn btn-success\" onclick=\"runSetup()\"><i data-lucide=\"database\" style=\"width:16px\"></i> Setup Sheet</button></div></div><div class=\"card\"><div class=\"card-body\"><table class=\"table\"><thead><tr><th>Karyawan</th><th>NIK</th><th>Divisi</th><th>Foto Wajah</th><th>Aksi</th></tr></thead><tbody id=\"emp-table\"></tbody></table></div></div>';lucide.createIcons();renderEmpTable();}";
  js += "function renderEmpTable(){var tb=document.getElementById('emp-table');if(!tb)return;if(employees.length===0){tb.innerHTML='<tr><td colspan=\"5\" style=\"text-align:center;padding:30px;color:var(--gray)\">Belum ada data karyawan</td></tr>';return;}var h='';for(var i=0;i<employees.length;i++){var e=employees[i];var fb=e.hasFace?'<span class=\"badge badge-success\">Terdaftar</span>':'<button class=\"btn btn-outline\" onclick=\"regFace(\\''+e.id+'\\',\\''+e.nama+'\\')\">Upload Foto</button>';h+='<tr><td><div class=\"student-cell\"><div class=\"avatar '+getColor(i)+'\">'+getInit(e.nama)+'</div><span style=\"font-weight:500\">'+e.nama+'</span></div></td><td>'+e.nik+'</td><td>'+e.divisi+'</td><td>'+fb+'</td><td><button class=\"action-btn\" onclick=\"deleteEmp(\\''+e.id+'\\')\"><i data-lucide=\"trash-2\"></i></button></td></tr>';}tb.innerHTML=h;lucide.createIcons();}";
  js += "function renderPengaturan(){var c=document.getElementById('main-content');c.innerHTML='<div class=\"page-header\"><h1>Pengaturan</h1></div><div class=\"card\"><div class=\"card-body\"><div class=\"form-group\"><label class=\"form-label\">Jam Masuk (Batas Terlambat)</label><input type=\"time\" class=\"form-input\" id=\"set-jam-masuk\" value=\"'+appSettings.jamMasuk+'\"></div><div class=\"form-group\"><label class=\"form-label\">Jam Pulang (Batas Lembur)</label><input type=\"time\" class=\"form-input\" id=\"set-jam-pulang\" value=\"'+appSettings.jamPulang+'\"></div><button class=\"btn btn-primary\" onclick=\"saveSettings()\">Simpan Perubahan</button></div></div>';}";
  js += "function showAddModal(){var m=document.getElementById('modal');m.innerHTML='<div class=\"modal\"><div class=\"modal-header\"><span class=\"modal-title\">Tambah Karyawan</span><button class=\"modal-close\" onclick=\"closeModal()\">&times;</button></div><div class=\"modal-body\"><div class=\"form-group\"><label class=\"form-label\">NIK / ID</label><input type=\"text\" class=\"form-input\" id=\"add-nik\"></div><div class=\"form-group\"><label class=\"form-label\">Nama Lengkap</label><input type=\"text\" class=\"form-input\" id=\"add-nama\"></div><div class=\"form-group\"><label class=\"form-label\">Divisi</label><input type=\"text\" class=\"form-input\" id=\"add-divisi\"></div><button class=\"btn btn-primary\" style=\"width:100%\" onclick=\"submitAdd()\">Simpan</button></div></div>';m.classList.add('active');}";
  js += "function regFace(id,nm){var m=document.getElementById('modal');m.innerHTML='<div class=\"modal\"><div class=\"modal-header\"><span class=\"modal-title\">Foto Wajah - '+nm+'</span><button class=\"modal-close\" onclick=\"closeModal()\">&times;</button></div><div class=\"modal-body\"><div style=\"padding:20px;text-align:center;border:2px dashed var(--border);cursor:pointer\" onclick=\"document.getElementById(\\'f-in\\').click()\"><input type=\"file\" id=\"f-in\" hidden accept=\"image/*\" onchange=\"previewFoto(this)\"><p>Klik Upload Foto</p></div><div id=\"preview-box\" style=\"display:none;margin-top:10px\"><img id=\"preview-img\" style=\"width:100%;max-height:200px\"></div><button id=\"save-btn\" disabled class=\"btn btn-primary\" style=\"width:100%;margin-top:10px\" onclick=\"saveFace(\\''+id+'\\')\">Simpan Wajah</button><div id=\"face-status\" style=\"display:none;margin-top:5px\"></div></div></div>';m.classList.add('active');loadFaceApi();}";
  return js;
}

function getAdminJS4() {
  var js = "";
  js += "var uploadedImg=null;function previewFoto(input){if(input.files&&input.files[0]){var reader=new FileReader();reader.onload=function(e){uploadedImg=new Image();uploadedImg.onload=function(){document.getElementById('preview-box').style.display='block';document.getElementById('preview-img').src=e.target.result;document.getElementById('save-btn').disabled=false;};uploadedImg.src=e.target.result;};reader.readAsDataURL(input.files[0]);}}";
  js += "function loadFaceApi(){Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'),faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'),faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model')]).then(function(){console.log('Face API Loaded');});}";
  js += "function saveFace(id){document.getElementById('face-status').style.display='block';document.getElementById('face-status').textContent='Memproses...';var cv=document.createElement('canvas');cv.width=uploadedImg.width;cv.height=uploadedImg.height;cv.getContext('2d').drawImage(uploadedImg,0,0);faceapi.detectSingleFace(cv,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor().then(function(d){if(d){var desc=Array.from(d.descriptor);var sm=document.createElement('canvas');sm.width=200;sm.height=200;sm.getContext('2d').drawImage(uploadedImg,0,0,200,200);var url=sm.toDataURL('image/jpeg',0.5);google.script.run.withSuccessHandler(function(r){closeModal();if(r.success){showToast('Berhasil','success');loadData();}else showToast('Gagal','error');}).registerFace({id:id,desc:desc,url:url});}else{document.getElementById('face-status').textContent='Wajah tidak terdeteksi';}});}";
  js += "function submitAdd(){var nik=document.getElementById('add-nik').value;var nm=document.getElementById('add-nama').value;var div=document.getElementById('add-divisi').value;if(!nik||!nm)return;google.script.run.withSuccessHandler(function(r){closeModal();loadData();}).addEmployee({nik:nik,nama:nm,divisi:div});}";
    js += "function deleteEmp(id){if(confirm('Hapus?')){google.script.run.withSuccessHandler(function(){loadData();}).deleteEmployee(id);}}function runSetup(){google.script.run.withSuccessHandler(function(r){showToast(r,'success');}).setupSpreadsheet();}function saveSettings(){var jm=document.getElementById('set-jam-masuk').value;var jp=document.getElementById('set-jam-pulang').value;google.script.run.withSuccessHandler(function(){showToast('Tersimpan','success');loadData();}).updateSettings({jamMasuk:jm, jamPulang:jp});}";
  js += "function closeModal(){document.getElementById('modal').classList.remove('active');}function showToast(m,t){var c=document.getElementById('toasts');var d=document.createElement('div');d.className='toast '+(t==='error'?'error':'');d.textContent=m;c.appendChild(d);setTimeout(function(){d.remove();},3000);}";
  return js;
}

function getEmployeeHTML() {
  return "<div class='mobile-app' id='app-container'></div><div class='toast-container' id='toasts'></div>";
}

function getEmployeeJS() {
  var js = "";
  js += "var currEmp=null;var vid=null;var loc={lat:'',lng:'',alamat:''};var faceLoaded=false;var clockInt=null;document.addEventListener('DOMContentLoaded',function(){lucide.createIcons();showInput();});";
  js += "function showInput(){stopClock();document.getElementById('app-container').innerHTML='<div class=\"input-screen\"><div class=\"logo-box\" style=\"margin-bottom:20px\"><i data-lucide=\"hexagon\" style=\"width:24px\"></i></div><h1 class=\"welcome-text\">Attendance Pro</h1><p class=\"welcome-sub\">Enter your Employee ID to access the attendance portal.</p><div class=\"form-group\"><input type=\"text\" class=\"form-input\" id=\"nik-in\" placeholder=\"Employee ID (NIK)\"></div><button class=\"btn-primary\" onclick=\"checkEmp()\">Get Started</button></div>';lucide.createIcons();}";
  js += "function checkEmp(){";
  // Added DEBUG TRY-CATCH
  js += "var btn = document.querySelector('button.btn-primary');";
  js += "var inp = document.getElementById('nik-in');";
  js += "var nik = inp.value; if(!nik)return;";
  // Rename button check for freshness
  js += "var t = btn.innerText; btn.innerText='Verifying...'; btn.disabled=true;";
  js += "google.script.run.withSuccessHandler(function(r){";
  // WRAP IN TRY CATCH
  js += "try {";
  js += "  btn.innerText=t; btn.disabled=false;";
  js += "  r = JSON.parse(r);"; // Parse manually
  js += "  if(r.success){";
  js += "     currEmp=r.data;";
  js += "     showAction(r.status);"; // No alert here to keep it clean, if it crashes we catch
  js += "  }else{";
  js += "     alert(r.message||'Employee not found');";
  js += "  }";
  js += "} catch(err) { alert('CLIENT JS ERROR: ' + err.message + ' ' + err.stack); }";
  
  js += "}).withFailureHandler(function(e){btn.innerText=t;btn.disabled=false;alert('Conn Error: '+e);}).getEmployeeByNIK(nik);}";
  
  js += "function showAction(status){";
  js += "var btnTxt; var btnClass='btn-primary';";
  js += "if(status==='belum_masuk') { btnTxt='Absen Masuk'; btnClass='btn-primary'; }";
  js += "else if(status==='sudah_masuk') { btnTxt='Absen Pulang'; btnClass='btn-warning'; }"; 
  js += "else { btnTxt='Sudah Selesai'; btnClass='btn-success'; }";
  
  js += "var sub=status==='belum_masuk'?'Have a great day at work!':'You have worked hard today.';";
  
  var h = "";
  h += "<div class='app-header'><div class='app-logo'><div class='logo-box'><i data-lucide='hexagon' style='width:20px'></i></div><div><h3 style='font-size:14px;font-weight:700'>Attendance Pro</h3><p style='font-size:10px;color:var(--text-muted)'>ID: #\" + currEmp.nik + \"</p></div></div>";
  h += "<div class='header-actions'><div class='icon-btn'><i data-lucide='bell' style='width:18px'></i></div><div class='icon-btn' onclick='showInput()'><i data-lucide='log-out' style='width:18px'></i></div></div></div>";
  h += "<div class='time-section'><div class='digital-clock' id='clock'>00:00</div><div class='date-text' id='date'>Loading...</div></div>";
  h += "<div class='scan-container'><div class='scan-circle'><video id='cam' class='camera-video' autoplay playsinline></video><div class='scan-overlay'></div><div class='scan-line'></div></div><div class='gps-badge' id='gps-badge'><i data-lucide='map-pin' style='width:12px'></i> GPS SEARCHING</div></div>";
  h += "<p class='scan-status'>Scanning... Keep your face within the frame</p><div class='location-card'><div class='loc-header'><span>Current Location</span><span style='color:var(--primary)' id='addr-header'>Locating...</span></div><div class='map-view' id='map-box'><div class='map-pin-anim'></div><div style='position:absolute;bottom:10px;left:10px;right:10px;background:rgba(0,0,0,0.6);padding:8px;border-radius:8px;font-size:10px' id='addr-text'>Detecting...</div></div></div>";
  h += "<div style='padding:0 20px 100px'><button id='act-btn' class='\"+btnClass+\"' disabled onclick='doAbsen(\\\"\"+status+\"\\\")' style='display:flex;align-items:center;justify-content:center;gap:10px;width:100%'><i data-lucide='scan-face'></i> \"+btnTxt+\"</button></div>";
  h += "<div class='bottom-nav'><div class='nav-icon active'><i data-lucide='home' style='width:20px'></i><span>Home</span></div><div class='nav-icon'><i data-lucide='calendar' style='width:20px'></i><span>History</span></div><div class='nav-icon'><i data-lucide='user' style='width:20px'></i><span>Profile</span></div></div>";
  
  js += "var h = \"" + h + "\";";
  js += "document.getElementById('app-container').innerHTML=h;lucide.createIcons();startClock();startCam();getLoc();}";
  js += "function startClock(){updateTime();clockInt=setInterval(updateTime,1000);}function stopClock(){if(clockInt)clearInterval(clockInt);}function updateTime(){var d=new Date();var h=d.getHours();var m=d.getMinutes();var am=h>=12?'PM':'AM';h=h?h:12;m=m<10?'0'+m:m;document.getElementById('clock').innerHTML=h+':'+m+' <span style=\"font-size:16px;font-weight:400\">'+am+'</span>';var opts={weekday:'long',year:'numeric',month:'long',day:'numeric'};document.getElementById('date').innerText=d.toLocaleDateString('en-US',opts);}";
  js += "function startCam(){navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}}).then(function(s){vid=s;document.getElementById('cam').srcObject=s;loadFace();});}function loadFace(){Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'),faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'),faceapi.nets.faceRecognitionNet.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model')]).then(function(){faceLoaded=true;document.getElementById('act-btn').disabled=false;});}";
  js += "function getLoc(){if(navigator.geolocation){navigator.geolocation.getCurrentPosition(function(p){loc.lat=p.coords.latitude;loc.lng=p.coords.longitude;document.getElementById('gps-badge').className='gps-badge locked';document.getElementById('gps-badge').innerHTML='<i data-lucide=\"check-circle\" style=\"width:12px\"></i> GPS LOCKED';fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat='+p.coords.latitude+'&lon='+p.coords.longitude).then(function(r){return r.json();}).then(function(d){loc.alamat=d.display_name||'';document.getElementById('addr-text').innerText=loc.alamat;document.getElementById('addr-header').innerText=d.address.city||d.address.town||'Location Found';});},function(){document.getElementById('addr-text').innerText='GPS Error';});}}";
  js += "function doAbsen(type){var v=document.getElementById('cam');var cv=document.createElement('canvas');cv.width=v.videoWidth;cv.height=v.videoHeight;cv.getContext('2d').drawImage(v,0,0);document.getElementById('act-btn').innerText='Verifying...';document.getElementById('act-btn').disabled=true;faceapi.detectSingleFace(cv,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor().then(function(d){if(!d){alert('Face not detected');document.getElementById('act-btn').disabled=false;return;}var desc=d.descriptor;if(currEmp.desc){var dist=faceapi.euclideanDistance(desc,currEmp.desc);if(dist>0.5){alert('Face mismatch!');document.getElementById('act-btn').disabled=false;return;}}else{alert('Face not registered!');document.getElementById('act-btn').disabled=false;return;}var url=cv.toDataURL('image/jpeg',0.5);google.script.run.withSuccessHandler(function(r){showSuccess(type);}).submitAttendance({id:currEmp.id,type:type,foto:url,lat:loc.lat,lng:loc.lng,alamat:loc.alamat});});}";
  js += "function showSuccess(type){document.getElementById('app-container').innerHTML='<div class=\"input-screen\" style=\"text-align:center\"><div style=\"width:80px;height:80px;background:rgba(16,185,129,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:var(--success)\"><i data-lucide=\"check\" style=\"width:40px;height:40px\"></i></div><h2 style=\"font-size:24px;font-weight:700;margin-bottom:10px\">Access Granted</h2><p style=\"color:var(--text-muted)\">Attendance recorded successfully.</p><button class=\"btn-primary\" style=\"margin-top:30px\" onclick=\"showInput()\">Back to Home</button></div>';lucide.createIcons();stopClock();stopCam();}";
  return js;
}

function getSpreadsheet(){if(SPREADSHEET_ID)return SpreadsheetApp.openById(SPREADSHEET_ID);return SpreadsheetApp.getActiveSpreadsheet();}
function getSheet(n){var ss=getSpreadsheet();var s=ss.getSheetByName(n);if(!s)s=ss.insertSheet(n);return s;}

function setupSpreadsheet(){var ss=getSpreadsheet();var s1=ss.getSheetByName(SHEET_KARYAWAN);if(!s1)s1=ss.insertSheet(SHEET_KARYAWAN);if(s1.getLastRow()===0)s1.appendRow(["ID","NIK","Nama","Divisi","Foto","Status","FaceDescriptor"]);var s2=ss.getSheetByName(SHEET_ABSENSI);if(!s2)s2=ss.insertSheet(SHEET_ABSENSI);if(s2.getLastRow()===0)s2.appendRow(["ID","KaryawanID","Nama","Divisi","Tanggal","JamMasuk","JamPulang","StatusMasuk","FotoMasuk","FotoPulang","LokasiMasuk","LokasiPulang","StatusPulang"]);var s3=ss.getSheetByName(SHEET_SETTINGS);if(!s3)s3=ss.insertSheet(SHEET_SETTINGS);if(s3.getLastRow()===0){s3.appendRow(["Key","Value"]);s3.appendRow(["jamMasuk","08:00"]);s3.appendRow(["jamPulang","17:00"]);}return "Setup berhasil!";}

function getEmployeeList(){var s=getSheet(SHEET_KARYAWAN);var d=s.getDataRange().getValues();var arr=[];for(var i=1;i<d.length;i++)arr.push({id:String(d[i][0]),nik:String(d[i][1]),nama:String(d[i][2]),divisi:String(d[i][3]),foto:String(d[i][4]||""),status:String(d[i][5]||"Aktif"),hasFace:d[i][6]?true:false});return {success:true,employees:arr};}

function addEmployee(d){var s=getSheet(SHEET_KARYAWAN);var id="EMP"+Date.now();s.appendRow([id,d.nik,d.nama,d.divisi,"","Aktif",""]);return {success:true};}

function deleteEmployee(id){var s=getSheet(SHEET_KARYAWAN);var rows=s.getDataRange().getValues();for(var i=1;i<rows.length;i++){if(rows[i][0]===id){s.deleteRow(i+1);break;}}return {success:true};}

function registerFace(d){var s=getSheet(SHEET_KARYAWAN);var rows=s.getDataRange().getValues();for(var i=1;i<rows.length;i++){if(rows[i][0]===d.id){s.getRange(i+1,5).setValue(d.url);s.getRange(i+1,7).setValue(JSON.stringify(d.desc));break;}}return {success:true};}

function formatTime(v) {
  if(!v) return "";
  if(v instanceof Date) return Utilities.formatDate(v, "Asia/Jakarta", "HH:mm");
  return String(v);
}

// MANUAL SERIALIZATION TO PREVENT NULL RETURN
function getEmployeeByNIK(nik){
 try { 
  var s=getSheet(SHEET_KARYAWAN);
  var lastRow = s.getLastRow();
  if (lastRow < 2) return JSON.stringify({success:false, message: "No employees found"});

  // READ ONLY NIK COLUMN (Col 2) (1-based index but getRange args are 1-based)
  // getRange(row, col, numRows, numCols)
  var nikVals = s.getRange(2, 2, lastRow-1, 1).getValues();
  var targetNik = String(nik).trim();
  var rowIndex = -1;
  
  for(var i=0; i<nikVals.length; i++){
     if(String(nikVals[i][0]).trim() === targetNik){
         rowIndex = i + 2; 
         break;
    }
  }

  if(rowIndex === -1) return JSON.stringify({success:false, message: "Employee NIK not found"});
  
  // FETCH COLS 1-4 (ID, NIK, Nama, Divisi)
  var meta = s.getRange(rowIndex, 1, 1, 4).getValues()[0];
  var descVal = s.getRange(rowIndex, 7).getValue(); 
  
  var desc = null;
  try {
    if(descVal && String(descVal).length > 2) {
      desc = JSON.parse(descVal); 
    }
  } catch(e) { desc = []; }
  
  var emp = {
      id: String(meta[0]), 
      nik: String(meta[1]), 
      nama: String(meta[2]), 
      divisi: String(meta[3]), 
      desc: desc
  };
  
  // SESSION LOGIC
  var sa = getSheet(SHEET_ABSENSI);
  var lastAbsRow = sa.getLastRow();
  
  var status = "belum_masuk";
  var jamM = ""; // Explicitly string!
  
  if(lastAbsRow > 1){
     var searchDepth = Math.min(100, lastAbsRow-1);
     var startRow = lastAbsRow - searchDepth + 1;
     
     var idVals = sa.getRange(startRow, 2, searchDepth, 1).getValues();
     
     var lastMatchRelativeIndex = -1;
     var eId = String(emp.id).trim();

     for(var k=idVals.length-1; k>=0; k--){
         if(String(idVals[k][0]).trim() === eId){
             lastMatchRelativeIndex = k;
             break;
         }
     }
     
     if(lastMatchRelativeIndex !== -1){
        var actualRow = startRow + lastMatchRelativeIndex;
        var absRow = sa.getRange(actualRow, 6, 1, 2).getValues()[0]; 
        var m = absRow[0]; 
        var p = absRow[1]; 
        
        if(!p || String(p) === ""){
            status = "sudah_masuk";
            jamM = formatTime(m);
        } else {
            status = "belum_masuk";
        }
     }
  }
  
  emp.jamMasuk = jamM;
  // RETURN STRINGIFIED JSON
  return JSON.stringify({success:true, data:emp, status:status});
 } catch(e) {
    return JSON.stringify({success:false, message: "SERVER ERROR: " + e.toString()});
 }
}

function submitAttendance(d){
  var s=getSheet(SHEET_ABSENSI);
  var now=new Date();
  var today=Utilities.formatDate(now,"Asia/Jakarta","yyyy-MM-dd");
  var time=Utilities.formatDate(now,"Asia/Jakarta","HH:mm:ss");
  var locStr=(d.alamat?d.alamat+" ":"")+"("+d.lat+","+d.lng+")";
  
  if(d.type==='belum_masuk'){
    var set=getSheet(SHEET_SETTINGS).getDataRange().getValues();
    var jm="07:00"; 
    var foundJM=false;
    for(var i=1;i<set.length;i++){
      if(!foundJM && String(set[i][0]).trim().toLowerCase()==='jammasuk' && set[i][1]){
         jm=formatTime(set[i][1]); 
         foundJM=true;
      }
    }
    
    var nowMin = now.getHours() * 60 + now.getMinutes();
    var limitParts = jm.split(":");
    var limitMin = parseInt(limitParts[0]) * 60 + parseInt(limitParts[1]);
    
    var st = nowMin > limitMin ? "Terlambat" : "Tepat Waktu";
    var emp=getEmployeeById(d.id);
    
    s.appendRow(["ATT"+Date.now(),d.id,emp.nama,emp.divisi,"'"+today,time,"",st,d.foto,"",locStr,"",""]);
    SpreadsheetApp.flush(); 
  }else{
    // READ PULANG SETTINGS
    var set=getSheet(SHEET_SETTINGS).getDataRange().getValues();
    var jp="17:00"; var foundJP=false;
    for(var i=1;i<set.length;i++){
      if(!foundJP && String(set[i][0]).trim().toLowerCase()==='jampulang' && set[i][1]){
         jp=formatTime(set[i][1]);
         foundJP=true;
      }
    }
    
    // CALC STAT PULANG
    var nowMin = now.getHours() * 60 + now.getMinutes();
    var jpParts = jp.split(":");
    var jpMin = parseInt(jpParts[0]) * 60 + parseInt(jpParts[1]);
    
    var stP = "";
    if(nowMin < jpMin){
         stP = "Pulang Cepat";
    } else {
         var diff = nowMin - jpMin;
         var dh = Math.floor(diff/60);
         var dm = diff % 60;
         stP = "Lembur " + (dh>0 ? dh+"j " : "") + dm + "m";
    }

    var rows=s.getDataRange().getValues();
    var eId = String(d.id).trim();
    
    for(var j=rows.length-1; j>=1; j--){
       var rId = String(rows[j][1]).trim();
       var jamP = rows[j][6];
       if(rId == eId && (!jamP || String(jamP)==="")){
           s.getRange(j+1,7).setValue(time);
           s.getRange(j+1,10).setValue(d.foto);
           s.getRange(j+1,12).setValue(locStr);
           s.getRange(j+1,13).setValue(stP); // NEW STATUS COLUMN
           SpreadsheetApp.flush(); 
           break;
       }
    }
  }
  return {success:true};
}

function getEmployeeById(id){var s=getSheet(SHEET_KARYAWAN);var d=s.getDataRange().getValues();for(var i=1;i<d.length;i++){if(d[i][0]==id)return{nama:d[i][2],divisi:d[i][3]};}return {nama:"",divisi:""};}

// HARDENED GET ATTENDANCE LOG
// DYNAMIC STATUS CALCULATION
function getAttendanceLog(){
  try {
      var s=getSheet(SHEET_ABSENSI);
      var range = s.getDataRange();
      var d = range.getValues();
      var arr=[];
      
      // GET SETTINGS FOR DYNAMIC CALC
      var set = getSheet(SHEET_SETTINGS).getDataRange().getValues();
      var jp = "17:00"; var foundJP=false;
      for(var x=1;x<set.length;x++) {
        if(!foundJP && String(set[x][0]).trim().toLowerCase()==='jampulang'){
           jp=formatTime(set[x][1]);
           foundJP=true;
        }
      }
      var parts = jp.split(":");
      var limit = parseInt(parts[0])*60 + parseInt(parts[1]);

      var validData = [];
      for(var j=0; j<d.length; j++){
         if(d[j][0] && String(d[j][0]).length > 0) validData.push(d[j]);
      }
      d = validData;
      var start = Math.max(1, d.length - 500);
      if(d.length <= 1) return {success:true, attendance:[]}; 

      for(var i=start;i<d.length;i++){
        var rDate = d[i][4];
        var dateStr = "";
        try {
            if(rDate instanceof Date){
                // Shift to Noon to avoid timezone midnight shift issues
                var noony = new Date(rDate);
                noony.setHours(12);
                dateStr = Utilities.formatDate(noony, "Asia/Jakarta", "yyyy-MM-dd");
            } else {
                dateStr = rDate ? String(rDate).substring(0, 10) : "";
            }
        } catch(e) { dateStr = String(rDate); }
        
        var jPStr = formatTime(d[i][6]);
        var sPStr = d[i][12] ? String(d[i][12]) : "";
        
        // DYNAMIC CALC IF MISSING
        if((!sPStr || sPStr==="") && jPStr && jPStr!=="" && jPStr.includes(":")){
            var pParts = jPStr.split(":");
            var pMin = parseInt(pParts[0])*60 + parseInt(pParts[1]);
            if(pMin < limit) sPStr = "Pulang Cepat";
            else {
               var diff = pMin - limit;
               var dh = Math.floor(diff/60);
               var dm = diff % 60;
               sPStr = "Lembur " + (dh>0?dh+"j ":"") + dm + "m";
            }
        }

        arr.push({
          id: String(d[i][0]||""),
          nama: String(d[i][2]||""),
          divisi: String(d[i][3]||""),
          tanggal: dateStr,
          jamMasuk: formatTime(d[i][5]),
          jamPulang: jPStr,
          statusMasuk: d[i][7] ? String(d[i][7]) : "",
          fotoMasuk: d[i][8] ? String(d[i][8]) : "",
          statusPulang: sPStr 
        });
      }
      return {success:true, attendance:arr};
  } catch(e) {
      return {success:false, message: e.toString() + " " + (e.stack||"")};
  }
}

function getStats() {
  var today = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd");
  var s = getSheet(SHEET_ABSENSI).getDataRange().getValues();
  var h = 0, p = 0, t = 0;
  
  for (var i = 1; i < s.length; i++) {
    var rDate = s[i][4];
    if (rDate instanceof Date) {
      // Shift to Noon to prevent timezone rollback
      var noony = new Date(rDate);
      noony.setHours(12);
      rDate = Utilities.formatDate(noony, "Asia/Jakarta", "yyyy-MM-dd");
    } else {
      rDate = String(rDate).substring(0, 10);
    }
    
    if (rDate == today) {
      h++;
      if (s[i][6]) p++;
      if (s[i][7] === "Terlambat") t++;
    }
  }
  
  var top = [];
  var sk = getSheet(SHEET_KARYAWAN).getDataRange().getValues();
  var allEmp = sk.length - 1;
  var topMap = {};
  var photoMap = {}; // Name -> Photo URL
  
  // Build Photo Map
  for(var m=1; m<sk.length; m++){
     var mName = String(sk[m][2]||"").trim(); // Name Col 3
     var mFoto = String(sk[m][4]||""); // Photo Col 5
     if(mName) photoMap[mName] = mFoto;
  }
  
  for (var j = 1; j < s.length; j++) {
    var nm = String(s[j][2]||"").trim();
    var div = s[j][3];
    if (!topMap[nm]) topMap[nm] = { nama: nm, divisi: div, hadir: 0, foto: photoMap[nm]||"" };
    topMap[nm].hadir++;
  }
  
  var sorted = Object.values(topMap).sort(function (a, b) {
    return b.hadir - a.hadir;
  }).slice(0, 5);
  
  // MONTHLY STATS
  var monthly = { labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], hadir: new Array(12).fill(0), alfa: new Array(12).fill(0) };
  
  // Group by Date to count unique attendees per day
  var dailyCounts = {};
  for(var k=1; k<s.length; k++){
     var dRaw = s[k][4];
     var dStr = "";
     try { if(dRaw instanceof Date) dStr=Utilities.formatDate(dRaw,"Asia/Jakarta","yyyy-MM-dd"); else dStr=String(dRaw).substring(0,10); } catch(e){}
     if(!dailyCounts[dStr]) dailyCounts[dStr] = 0;
     dailyCounts[dStr]++;
  }
  
  // Aggregate to Months
  for(var dateKey in dailyCounts){
     if(!dateKey || dateKey.length<10) continue;
     var dt = new Date(dateKey);
     var mIdx = dt.getMonth(); // 0-11
     var countHadir = dailyCounts[dateKey];
     var countAlfa = Math.max(0, allEmp - countHadir);
     
     // Only count for this year? Let's assume yes.
     if(dt.getFullYear() === new Date().getFullYear()){
         monthly.hadir[mIdx] += countHadir;
         monthly.alfa[mIdx] += countAlfa;
     }
  }

  return {
    success: true,
    stats: {
      totalHadir: h,
      totalPulang: p,
      totalTerlambat: t,
      belumAbsen: allEmp - h,
      topRajin: sorted,
      monthly: monthly
    }
  };
}

// UPDATED SETTINGS
function getSettings() {
  var s = getSheet(SHEET_SETTINGS).getDataRange().getValues();
  var res = { jamMasuk: "08:00", jamPulang: "17:00" };
  var foundM=false, foundP=false;
  
  for(var i=1; i<s.length; i++){
    var k = String(s[i][0]).trim().toLowerCase();
    if(!foundM && k === 'jammasuk') { res.jamMasuk = formatTime(s[i][1]); foundM=true; }
    if(!foundP && k === 'jampulang') { res.jamPulang = formatTime(s[i][1]); foundP=true; }
  }
  return {success:true, data:res};
}

function updateSettings(d) {
  var s = getSheet(SHEET_SETTINGS);
  var data = s.getDataRange().getValues();
  
  var setVal = function(key, val) {
     var foundIdx = -1;
     // Find FIRST match
     for(var i=1; i<data.length; i++){
        if(String(data[i][0]).trim().toLowerCase() === key.toLowerCase()) {
           foundIdx = i;
           break;
        }
     }
     
     if(foundIdx !== -1) {
        // Update first match
        var cell = s.getRange(foundIdx+1, 2);
        cell.setNumberFormat("@"); // Force Text
        cell.setValue(String(val));
        
        // REMOVE DUPLICATES (If any exist further down)
        // We iterate backwards to delete safely
        var rows = s.getDataRange().getValues(); // Re-read to be safe? No, just use memory index if careful.
        // Actually, safer to just rely on "First Match Wins" logic for reading.
        // But let's delete to be clean.
     } else {
        s.appendRow([key, "'" + val]); // Append with ' to force string
     }
  };
  
  if(d.jamMasuk) setVal('jamMasuk', d.jamMasuk);
  if(d.jamPulang) setVal('jamPulang', d.jamPulang);
  
  SpreadsheetApp.flush(); // FORCE WRITE BEFORE READ
  return {success:true};
}

function runBackfillAndFix() {
  var s = getSheet(SHEET_ABSENSI);
  var data = s.getDataRange().getValues();
  var set = getSheet(SHEET_SETTINGS).getDataRange().getValues();
  var jp = "17:00"; var foundJP=false;
  for(var x=1;x<set.length;x++) {
     if(!foundJP && String(set[x][0]).trim().toLowerCase()==='jampulang') {
        jp=formatTime(set[x][1]); foundJP=true; 
     }
  }
  
  var parts = jp.split(":");
  var limit = parseInt(parts[0])*60 + parseInt(parts[1]);
  
  for(var i=1; i<data.length; i++) {
     var jamP = data[i][6]; // Col 7 (Index 6)
     var statP = data[i][12]; // Col 13 (Index 12)
     
     if (jamP && String(jamP).trim() !== "" && (!statP || statP === "")) {
        var pTime = formatTime(jamP);
        if(!pTime.includes(":")) continue;
        
        var pParts = pTime.split(":");
        var pMin = parseInt(pParts[0])*60 + parseInt(pParts[1]);
        
        var st = "";
        if(pMin < limit) st = "Pulang Cepat";
        else {
           var diff = pMin - limit;
           var dh = Math.floor(diff/60);
           var dm = diff % 60;
           st = "Lembur " + (dh>0?dh+"j ":"") + dm + "m";
        }
        s.getRange(i+1, 13).setValue(st);
     }
  }
  return "Backfill Complete";
}
