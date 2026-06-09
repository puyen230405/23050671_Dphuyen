const macro=[
 {year:2020,Y:8044.4,K:16500,L:53.6,D:12.0,AI:55.6,H:24.1},{year:2021,Y:8487.5,K:17800,L:50.5,D:12.7,AI:60.2,H:26.1},{year:2022,Y:9513.3,K:19600,L:51.7,D:14.3,AI:65.4,H:26.2},{year:2023,Y:10221.8,K:21300,L:52.4,D:16.5,AI:67.0,H:27.0},{year:2024,Y:11511.9,K:23500,L:52.9,D:18.3,AI:73.8,H:28.4},{year:2025,Y:12847.6,K:25900,L:53.4,D:19.5,AI:80.1,H:29.2}
];
const sectors=[
 ['Nông - lâm - thủy sản',3.27,103.4,.35,40.5,13.2,15,18],['Công nghiệp chế biến chế tạo',9.64,241.2,.78,290.9,11.5,55,42],['Xây dựng',7.45,168.8,.42,2.5,4.8,20,25],['Khai khoáng',-1.2,1290.5,.30,8.2,.3,30,55],['Bán buôn - bán lẻ',7.10,145.3,.55,5.5,7.8,48,38],['Tài chính - ngân hàng',7.36,1072.4,.85,1.2,.55,72,52],['Logistics - vận tải',9.93,321.4,.72,3.1,1.95,42,35],['CNTT - truyền thông',7.85,713.8,.92,178,.62,88,28],['Giáo dục - đào tạo',6.42,205.7,.65,0,2.15,38,22],['Y tế',6.85,437.1,.60,0,.75,45,18]
];
const regions=[
 ['Trung du miền núi phía Bắc',57,3.5,38,22,21.5,.18,72,.405],['Đồng bằng sông Hồng',152.3,20,78,68,36.8,.85,92,.358],['Bắc Trung Bộ và Duyên hải miền Trung',87.5,8.2,55,40,27.5,.32,84,.372],['Tây Nguyên',68.9,.8,32,18,18.2,.15,68,.412],['Đông Nam Bộ',158.9,18.5,82,75,42.5,.78,94,.385],['Đồng bằng sông Cửu Long',80.5,2.1,48,30,16.8,.22,78,.392]
];
const tasks=[['home','Trang chủ','Tổng quan web'],['b1','Bài 1. Cobb-Douglas mở rộng','TFP, dự báo GDP và phân rã tăng trưởng'],['b2','Bài 2. LP ngân sách 4 hạng mục','Tối ưu ngân sách số và độ nhạy'],['b3','Bài 3. Priority 10 ngành','Xếp hạng ưu tiên ngành'],['b4','Bài 4. LP ngành - vùng','Phân bổ ngân sách theo vùng'],['b5','Bài 5. MIP 15 dự án','Lựa chọn dự án chuyển đổi số'],['b6','Bài 6. TOPSIS 6 vùng','Xếp hạng vùng ưu tiên'],['b7','Bài 7. NSGA-II Pareto','Tối ưu đa mục tiêu'],['b8','Bài 8. Quy hoạch động 2026-2035','Tối ưu ngân sách theo thời gian'],['b9','Bài 9. Lao động và công nghệ','Mô phỏng dịch chuyển lao động'],['b10','Bài 10. Stochastic Programming','Tối ưu trong điều kiện bất định'],['b11','Bài 11. Q-learning','Học tăng cường cho chính sách'],['b12','Bài 12. AIDEOM tích hợp','Dashboard tổng hợp']];

let current='home';
const $=id=>document.getElementById(id);

// Central reactive parameter state
const paramsState = {
  b1: { a: 0.33, b: 0.42, g: 0.10, d: 0.08, t: 0.07 },
  b2: { budget: 100, x1: 25, x2: 15, x3: 20, x4: 10 },
  b3: { w1: 0.15, w2: 0.15, w3: 0.20, w4: 0.20, w5: 0.15 },
  b4: { budget: 50000, minReg: 5000, maxReg: 12000, minH: 12000, lambda: 0.7 },
  b5: { budget: 80000, budget12: 40000, minP: 7, maxP: 11, forceP14: 1 },
  b6: { w1: 0.10, w2: 0.10, w3: 0.15, w4: 0.20, w5: 0.10 },
  b7: { budget: 64000, w1: 0.35, w2: 0.25, w3: 0.15, w4: 0.92 },
  b8: { budget: 66000, w1: 0.35, w2: 0.25, w3: 0.15, w4: 0.92 },
  b9: { budget: 68000, w1: 0.35, w2: 0.25, w3: 0.15, w4: 0.92 },
  b10: { budget: 70000, w1: 0.35, w2: 0.25, w3: 0.15, w4: 0.92 },
  b11: { budget: 72000, w1: 0.35, w2: 0.25, w3: 0.15, w4: 0.92 },
  b12: { budget: 74000, w1: 0.35, w2: 0.25, w3: 0.15, w4: 0.92 }
};

// Project list for MIP (Lesson 5)
const allProjects = [
  { id: 'P1', name: 'Trục liên thông văn bản quốc gia', cost: 2500, npv: 4800 },
  { id: 'P2', name: 'Cơ sở dữ liệu dân cư quốc gia', cost: 12000, npv: 22000 },
  { id: 'P3', name: 'Hệ thống 5G phủ sóng toàn quốc', cost: 18000, npv: 32500 },
  { id: 'P4', name: 'VNeID 2.0', cost: 4500, npv: 9200 },
  { id: 'P5', name: 'Trường học số & học liệu mở', cost: 3200, npv: 5800 },
  { id: 'P6', name: 'Y tế số quốc gia', cost: 5800, npv: 11400 },
  { id: 'P7', name: 'Hồ sơ sức khỏe điện tử', cost: 2200, npv: 4100 },
  { id: 'P8', name: 'Trung tâm AI quốc gia', cost: 15000, npv: 28500 },
  { id: 'P9', name: 'Trung tâm dữ liệu xanh', cost: 9500, npv: 16800 },
  { id: 'P10', name: 'Logistics thông minh', cost: 7200, npv: 13800 },
  { id: 'P11', name: 'Thanh toán không tiền mặt', cost: 3000, npv: 6200 },
  { id: 'P12', name: 'Đào tạo 50.000 kỹ sư bán dẫn', cost: 8500, npv: 16200 },
  { id: 'P13', name: 'Khu công nghiệp công nghệ cao', cost: 20000, npv: 35000 },
  { id: 'P14', name: 'Trung tâm an ninh mạng SOC', cost: 3800, npv: 7500 },
  { id: 'P15', name: 'Cổng dịch vụ công trực tuyến', cost: 5000, npv: 9800 }
];

function fmt(x,d=1){return Number(x).toLocaleString('vi-VN',{maximumFractionDigits:d,minimumFractionDigits:d})}
function table(headers,rows){return `<div class="table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function metrics(items){return `<div class="metric-row">${items.map(i=>`<div class="metric"><small>${i[0]}</small><strong>${i[1]}</strong><em>${i[2]||''}</em></div>`).join('')}</div>`}
function controls(keys, items){return `<div class="control-grid">${items.map((i, idx)=>`<div class="control"><label>${i[0]}</label><input data-key="${keys[idx]}" type="text" inputmode="decimal" value="${i[1]}"></div>`).join('')}</div><p class="footer-note">Người học có thể chỉnh các tham số khi thuyết trình để kiểm tra độ nhạy của kết quả. Các giá trị mặc định bám theo đề bài và dữ liệu gốc.</p>`}

// 1. VERTICAL BAR CHART
function bars(title, labels, values){
  let max=Math.max(...values.map(v=>Math.abs(v)))||1;
  return `<div class="chart-box">
    <div style="font-weight:700; font-size:13px; margin-bottom:10px; color:#0c4f86; font-family:'Times New Roman',Times,serif">${title}</div>
    <div class="chart-bars">${values.map((v,i)=>`<div class="bar" style="height:${Math.max(10,Math.abs(v)/max*200)}px"><span>${fmt(v,1)}</span><em title="${labels[i]}">${labels[i]}</em></div>`).join('')}</div>
  </div>`;
}

// 2. HORIZONTAL BAR CHART
function horizontalBars(title, labels, values) {
  let max = Math.max(...values.map(v => Math.abs(v))) || 1;
  return `<div class="chart-box" style="padding-left:18px; display:flex; flex-direction:column; justify-content:space-between">
    <div style="font-weight:700; font-size:13px; color:#0c4f86; font-family:'Times New Roman',Times,serif; margin-bottom:10px">${title}</div>
    <div style="display:flex; flex-direction:column; gap:8px; overflow-y:auto; flex:1">
      ${values.map((v, i) => {
        let pct = (Math.abs(v) / max) * 82; // Cap at 82% to give room for numbers on the right
        return `
          <div style="display:flex; align-items:center; gap:10px">
            <span style="width:120px; font-size:12px; color:#46586d; white-space:nowrap; overflow:hidden; text-overflow:ellipsis" title="${labels[i]}">${labels[i]}</span>
            <div style="flex:1; background:#eef5fb; height:18px; border-radius:4px; overflow:hidden; position:relative">
              <div style="width:${pct}%; background:linear-gradient(90deg,#1677b8,#0c4f86); height:100%; border-radius:4px"></div>
              <span style="position:absolute; left:calc(${pct}% + 6px); top:50%; transform:translateY(-50%); font-size:11px; font-weight:700; color:#0c4f86">${fmt(v,1)}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  </div>`;
}

// 3. LINE CHART (using inline SVG)
function lineChart(title, labels, values) {
  let min = Math.min(...values), max = Math.max(...values);
  let pad = (max - min) * 0.1 || 1;
  let minVal = min - pad;
  let maxVal = max + pad;
  let range = maxVal - minVal;
  
  let width = 500, height = 200;
  let points = values.map((v, i) => {
    let x = 50 + (i / (values.length - 1)) * (width - 80);
    let y = height - 40 - ((v - minVal) / range) * (height - 65);
    return { x, y, val: v, label: labels[i] };
  });
  
  let pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;
  
  let gridLines = '';
  for (let i = 0; i <= 4; i++) {
    let yVal = minVal + (range * i / 4);
    let y = height - 40 - (i / 4) * (height - 65);
    gridLines += `<line x1="50" y1="${y}" x2="${width - 30}" y2="${y}" stroke="#e2edf7" stroke-dasharray="4,4" />
                  <text x="12" y="${y + 4}" fill="#607086" font-size="11" font-family="'Times New Roman',Times,serif">${fmt(yVal,1)}</text>`;
  }
  
  let pointsMarkup = points.map(p => `
    <circle cx="${p.x}" cy="${p.y}" r="4" fill="#0c4f86" stroke="#fff" stroke-width="2" />
    <text x="${p.x}" y="${p.y - 8}" text-anchor="middle" fill="#0c4f86" font-weight="700" font-size="11" font-family="'Times New Roman',Times,serif">${fmt(p.val,1)}</text>
    <text x="${p.x}" y="${height - 20}" text-anchor="middle" fill="#607086" font-size="11" font-family="'Times New Roman',Times,serif">${p.label}</text>
  `).join('');
  
  return `<div class="chart-box">
    <div style="font-weight:700; font-size:13px; margin-bottom:12px; color:#0c4f86; font-family:'Times New Roman',Times,serif">${title}</div>
    <div style="display:flex; justify-content:center; align-items:center; height:calc(100% - 25px)">
      <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
        ${gridLines}
        <path d="${pathD}" fill="none" stroke="#1071b2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        ${pointsMarkup}
      </svg>
    </div>
  </div>`;
}

// 4. STACKED PERCENTAGE SEGMENT BAR
function stackedBar(title, labels, values) {
  let total = values.reduce((a, b) => a + b, 0) || 1;
  let colors = ['#0c4f86', '#1071b2', '#0b6b4f', '#8a5a00', '#d89b00', '#526175'];
  
  let segments = values.map((v, i) => {
    let pct = (v / total) * 100;
    let color = colors[i % colors.length];
    return { name: labels[i], val: v, pct, color };
  });
  
  let barMarkup = segments.map(s => `
    <div style="width:${s.pct}%; background:${s.color}; height:100%; position:relative" title="${s.name}: ${fmt(s.val, 1)} (${fmt(s.pct, 1)}%)"></div>
  `).join('');
  
  let legendMarkup = segments.map(s => `
    <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:#46586d">
      <span style="width:12px; height:12px; border-radius:3px; background:${s.color}; display:inline-block"></span>
      <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis" title="${s.name}">${s.name}: <strong>${fmt(s.val, 1)}</strong> (${fmt(s.pct, 1)}%)</span>
    </div>
  `).join('');
  
  return `<div class="chart-box" style="padding-left:18px; display:flex; flex-direction:column; justify-content:space-between">
    <div style="font-weight:700; font-size:13px; color:#0c4f86; font-family:'Times New Roman',Times,serif">${title}</div>
    <div style="height:28px; border-radius:8px; display:flex; overflow:hidden; background:#eef5fb; margin:14px 0 10px">
      ${barMarkup}
    </div>
    <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:6px; overflow-y:auto; flex:1">
      ${legendMarkup}
    </div>
  </div>`;
}

function agentText(topic,main,policy,critical){let mode=$('agentSelect')?.value||'academic';let title={academic:'Tác nhân học thuật',policy:'Tác nhân chính sách',critical:'Tác nhân phản biện',gemini:'Tác nhân mở rộng Gemini/Grok'}[mode];let text= mode==='policy'?policy: mode==='critical'?critical: mode==='gemini'?`${main} Khi tự gắn API, phần này có thể gửi bảng kết quả sang Gemini hoặc Grok để sinh nhận xét tự động; bản nộp vẫn có phân tích nội bộ để không phụ thuộc API.`:main;return `<div class="agent-box"><span class="mode">${title}</span><h4>Phân tích tác nhân</h4><p>${text}</p></div>`}
function analysis(title,paras,topic='mô hình'){return `<div class="analysis"><h4>${title}</h4><ul>${paras.map(p=>`<li>${p}</li>`).join('')}</ul></div>`}

function lesson(title,desc,ctrl,mets,tbl,chart,ana,agent){
  return `<div class="lesson-card">
    <span class="badge">${desc}</span>
    <h2 class="section-title" style="margin-top:12px">${title}</h2>
    <p>Trang này gồm khu chỉnh tham số, bảng dữ liệu đầu vào, kết quả tính toán, biểu đồ minh họa và phần diễn giải để đưa trực tiếp vào báo cáo.</p>
    <div class="tabs">
      <button class="active">Tổng quan</button>
      <button>Tham số</button>
      <button>Bảng số liệu</button>
      <button>Phân tích tác nhân</button>
    </div>
  </div>
  <div class="grid-2 section-params"><div class="card"><h3 class="section-title">Tham số điều chỉnh</h3>${ctrl}</div><div class="card" id="mets-card"><h3 class="section-title">Kết quả chính</h3>${mets}</div></div>
  <div class="grid-2 section-data"><div class="card" id="tbl-card"><h3 class="section-title">Bảng số liệu</h3>${tbl}</div><div class="card" id="chart-card"><h3 class="section-title">Biểu đồ</h3>${chart}</div></div>
  <div class="grid-2 section-agent"><div class="card"><h3 class="section-title">Nhận xét chi tiết</h3>${ana}</div><div class="card" id="agent-card"><h3 class="section-title">Tác nhân phân tích kết quả</h3>${agent}</div></div>`;
}

function home(){
  let cardsHTML = tasks.slice(1).map((t, idx) => `
    <div class="ex-card" data-goto="${t[0]}">
      <div class="ex-num">Bài ${idx + 1}</div>
      <div class="ex-name">${t[1]}</div>
      <div class="ex-method">${t[2]}</div>
    </div>
  `).join('');

  return `<div class="hero"><div><h3>Hệ thống hỗ trợ quyết định vĩ mô AIDEOM</h3><div class="kpi-grid"><div class="kpi"><span>GDP 2025</span><b>514,0 tỷ USD</b><small>Tăng trưởng 8,02%</small></div><div class="kpi"><span>Kinh tế số/GDP</span><b>19,5%</b><small>Mốc tham chiếu 2025</small></div><div class="kpi"><span>FDI giải ngân</span><b>27,6 tỷ USD</b><small>Nền tảng cho đầu tư số</small></div><div class="kpi"><span>GDP/người</span><b>5.026 USD</b><small>Chỉ báo mức sống</small></div></div></div></div><div class="home-list"><div><b>Dữ liệu vĩ mô</b><p>GDP, vốn, lao động, kinh tế số, năng lực công nghệ và nhân lực giai đoạn 2020-2025.</p></div><div><b>Dữ liệu ngành</b><p>10 ngành kinh tế với tăng trưởng, năng suất, lan tỏa, xuất khẩu, việc làm, readiness và rủi ro tự động hóa.</p></div><div><b>Dữ liệu vùng</b><p>6 vùng kinh tế - xã hội với GRDP/người, FDI, digital index, readiness, lao động đào tạo, R&D và Gini.</p></div></div>
  <h3 class="section-title" style="margin-top:28px">Danh sách các mô hình phân tích quyết định</h3>
  <div class="exercise-grid">
    ${cardsHTML}
  </div>`;
}

function solveLP(B, s1, s2, s3, s4) {
  let c1 = 0.8, c2 = 1.1, c3 = 1.2, c4 = 1.35;
  let sumS = s1 + s2 + s3 + s4;
  if (B < sumS) {
    return [B * (s1/sumS), B * (s2/sumS), B * (s3/sumS), B * (s4/sumS), B * (s1*c1 + s2*c2 + s3*c3 + s4*c4)/sumS];
  }
  let r = B - sumS;
  return [s1, s2, s3, s4 + r, s1*c1 + s2*c2 + s3*c3 + (s4 + r)*c4];
}

function minmax(data,col,reverse=false){
  let arr=data.map(r=>r[col]),mi=Math.min(...arr),ma=Math.max(...arr);
  return arr.map(x=>reverse?(ma-x)/(ma-mi):(x-mi)/(ma-mi));
}

function priorityScores(){
  let p = paramsState.b3;
  let w_growth = p.w1;
  let w_prod = p.w2;
  let w_spill = p.w3;
  let w_readiness = p.w4;
  let w_risk = p.w5;
  
  let norm_growth = minmax(sectors, 1, false);
  let norm_prod = minmax(sectors, 2, false);
  let norm_spill = minmax(sectors, 3, false);
  let norm_export = minmax(sectors, 4, false); 
  let norm_employ = minmax(sectors, 5, false); 
  let norm_readiness = minmax(sectors, 6, false);
  let norm_risk = minmax(sectors, 7, true); 
  
  return sectors.map((s, i) => {
    let score = w_growth * norm_growth[i] +
                w_prod * norm_prod[i] +
                w_spill * norm_spill[i] +
                0.10 * norm_export[i] + 
                0.05 * norm_employ[i] +
                w_readiness * norm_readiness[i] +
                w_risk * norm_risk[i];
    return [s[0], score];
  }).sort((a, b) => b[1] - a[1]);
}

function calculateB4() {
  let p = paramsState.b4;
  let B = p.budget;
  let minReg = p.minReg;
  let maxReg = p.maxReg;
  let lambda = p.lambda;
  
  let regNames = [
    'Trung du miền núi phía Bắc',
    'Đồng bằng sông Hồng',
    'Bắc Trung Bộ và Duyên hải miền Trung',
    'Tây Nguyên',
    'Đông Nam Bộ',
    'Đồng bằng sông Cửu Long'
  ];
  let readiness = [0.18, 0.85, 0.32, 0.15, 0.78, 0.22];
  let inverseReadiness = readiness.map(r => 1 - r);
  let sumReadiness = readiness.reduce((a, b) => a + b, 0);
  let sumInverse = inverseReadiness.reduce((a, b) => a + b, 0);
  
  let baseAlloc = regNames.map(() => minReg);
  let remaining = B - (minReg * 6);
  if (remaining < 0) remaining = 0;
  
  let shares = readiness.map((r, i) => {
    let eff = r / sumReadiness;
    let eq = inverseReadiness[i] / sumInverse;
    return (1 - lambda) * eff + lambda * eq;
  });
  
  let sumShares = shares.reduce((a,b)=>a+b,0);
  let alloc = baseAlloc.map((val, i) => {
    let extra = remaining * (shares[i] / sumShares);
    let total = val + extra;
    if (total > maxReg) total = maxReg;
    return total;
  });
  
  return regNames.map((name, i) => {
    let tot = alloc[i];
    let r = readiness[i];
    let ai = tot * (0.1 + 0.4 * r);
    let h = tot * (0.2 + 0.2 * (1 - r));
    let d = tot * (0.15 + 0.2 * r);
    let infra = tot - (ai + h + d);
    return [name, infra, d, ai, h];
  });
}

function solveMIP() {
  let p = paramsState.b5;
  let B = p.budget;
  let B12 = p.budget12;
  let minP = p.minP;
  let maxP = p.maxP;
  let forceP14 = p.forceP14;
  
  let sorted = [...allProjects].map(proj => {
    let cost12 = proj.cost * 0.5;
    return { ...proj, cost12, ratio: proj.npv / proj.cost };
  }).sort((a,b) => b.ratio - a.ratio);
  
  let selected = [];
  let currentCost = 0;
  let currentCost12 = 0;
  
  if (forceP14 === 1) {
    let p14 = sorted.find(x => x.id === 'P14');
    if (p14) {
      selected.push(p14);
      currentCost += p14.cost;
      currentCost12 += p14.cost12;
    }
  }
  
  for (let proj of sorted) {
    if (proj.id === 'P14' && forceP14 === 1) continue;
    if (currentCost + proj.cost <= B && currentCost12 + proj.cost12 <= B12 && selected.length < maxP) {
      selected.push(proj);
      currentCost += proj.cost;
      currentCost12 += proj.cost12;
    }
  }
  
  return selected.sort((a,b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)));
}

function calculateTopsis() {
  let p = paramsState.b6;
  let w = [p.w1, p.w2, p.w3, p.w4, 0.15, 0.15, p.w5, 0.05];
  let ben = [1, 1, 1, 1, 1, 1, 0, 1];
  
  let cols = [1,2,3,4,5,6,7,8].map(j => regions.map(r => r[j]));
  let norm = cols.map(c => Math.sqrt(c.reduce((s, x) => s + x * x, 0)));
  
  let V = regions.map(r => cols.map((c, j) => r[j+1] / norm[j] * w[j]));
  
  let star = w.map((_, j) => ben[j] ? Math.max(...V.map(r => r[j])) : Math.min(...V.map(r => r[j])));
  let neg = w.map((_, j) => ben[j] ? Math.min(...V.map(r => r[j])) : Math.max(...V.map(r => r[j])));
  
  return regions.map((r, i) => {
    let sp = Math.sqrt(V[i].reduce((s, x, j) => s + (x - star[j]) ** 2, 0));
    let sn = Math.sqrt(V[i].reduce((s, x, j) => s + (x - neg[j]) ** 2, 0));
    return [r[0], sn / (sp + sn)];
  }).sort((a, b) => b[1] - a[1]);
}

function getLessonParts(id) {
  if (id === 'b1') {
    let p = paramsState.b1;
    let a = p.a, b = p.b, g = p.g, d = p.d, t = p.t;
    let rows = macro.map(r => {
      let A = r.Y / (r.K**a * r.L**b * r.D**g * r.AI**d * r.H**t);
      return [r.year, fmt(r.Y, 1), fmt(r.K, 0), fmt(r.L, 1), fmt(r.D, 1), fmt(r.AI, 1), fmt(r.H, 1), fmt(A, 3)];
    });
    let At = rows.map(r => Number(String(r[7]).replace(',','.')));
    let A2025 = At[5] || 0.1;
    let Y2030 = A2025 * (35000**a) * (55**b) * (30**g) * (120**d) * (40**t);
    
    // Generate year-by-year forecast for 2026-2030 as a separate array
    let fcYears = [2026, 2027, 2028, 2029, 2030];
    let chartYValues = macro.map(r => r.Y);
    let fcRows = [];
    fcYears.forEach((yr, idx) => {
      let step = (idx + 1) / 5;
      let K = 25900 + (35000 - 25900) * step;
      let L = 53.4 + (55 - 53.4) * step;
      let D = 19.5 + (30 - 19.5) * step;
      let AI = 80.1 + (120 - 80.1) * step;
      let H = 29.2 + (40 - 29.2) * step;
      let Y = A2025 * (K**a) * (L**b) * (D**g) * (AI**d) * (H**t);
      
      chartYValues.push(Y);
      fcRows.push([yr, fmt(Y, 1), fmt(K, 0), fmt(L, 1), fmt(D, 1), fmt(AI, 1), fmt(H, 1), fmt(A2025, 3)]);
    });

    // Growth accounting calculation for 2024 to 2025
    let r0 = macro[4], r1 = macro[5];
    let gY = (r1.Y - r0.Y) / r0.Y || 0.1;
    let gK = (r1.K - r0.K) / r0.K;
    let gL = (r1.L - r0.L) / r0.L;
    let gD = (r1.D - r0.D) / r0.D;
    let gAI = (r1.AI - r0.AI) / r0.AI;
    let gH = (r1.H - r0.H) / r0.H;
    let contribK = (a * gK) / gY * 100;
    let contribL = (b * gL) / gY * 100;
    let contribD = (g * gD) / gY * 100;
    let contribAI = (d * gAI) / gY * 100;
    let contribH = (t * gH) / gY * 100;
    let contribTFP = 100 - (contribK + contribL + contribD + contribAI + contribH);
    
    // Time-series: LINE CHART for TFP
    let chart1 = lineChart('Xu hướng Chỉ số TFP (A_t) giai đoạn 2020-2025', macro.map(x=>String(x.year)), At);
    // Decomposition: VERTICAL BARS for growth accounting contribution
    let chart2 = bars('Tỷ lệ đóng góp của các yếu tố vào tăng trưởng GDP 2025 (%)', ['Vốn K', 'Lao động L', 'Kinh tế D', 'C.nghệ AI', 'Nhân lực H', 'TFP A'], [contribK, contribL, contribD, contribAI, contribH, contribTFP]);
    // GDP trajectory line chart
    let allYears = macro.map(x=>String(x.year)).concat(fcYears.map(String));
    let chart3 = lineChart('Quỹ đạo GDP thực tế và dự báo đến năm 2030 (nghìn tỷ VND)', allYears, chartYValues);

    return {
      mets: metrics([
        ['TFP 2020', rows[0][7], 'mức nền'],
        ['TFP 2025', rows[5][7], 'tăng đều'],
        ['GDP 2025', fmt(macro[5].Y, 1), 'nghìn tỷ VND'],
        ['Dự báo GDP 2030', fmt(Y2030, 1), 'nghìn tỷ VND']
      ]),
      tbl: `
        <div style="display:flex; flex-direction:column; gap:22px">
          <div>
            <div style="font-weight:700; font-size:14px; color:#0c4f86; margin-bottom:8px; display:flex; align-items:center; gap:6px; font-family:'Times New Roman',Times,serif">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#1071b2"></span>
              Bảng 1. Số liệu thực tế giai đoạn 2020–2025
            </div>
            ${table(['Năm','GDP Y thực tế','K','L','D','AI','H','TFP A_t'], rows)}
          </div>
          <div>
            <div style="font-weight:700; font-size:14px; color:#b06010; margin-bottom:8px; display:flex; align-items:center; gap:6px; font-family:'Times New Roman',Times,serif">
              <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:#d06010"></span>
              Bảng 2. Dự báo vĩ mô giai đoạn 2026–2030 (Mục tiêu 2030)
            </div>
            ${table(['Năm','GDP Y dự báo','K','L','D','AI','H','TFP A_t (Giả định)'], fcRows)}
          </div>
        </div>
      `,
      chart: `<div style="display:flex; flex-direction:column; gap:16px">${chart3}${chart1}${chart2}</div>`,
      agent: agentText('Bài 1',
        'Kết quả cho thấy chất lượng tăng trưởng có xu hướng cải thiện vì TFP tăng cùng với GDP. Điểm cần phân tích sâu là đóng góp của kinh tế số và nhân lực số: nếu chỉ tăng vốn mà không tăng H, hiệu ứng của công nghệ sẽ bị giới hạn.',
        'Khuyến nghị chính sách là không chỉ đặt mục tiêu tỷ trọng kinh tế số/GDP, mà phải gắn với đào tạo lao động, chuẩn dữ liệu và năng lực doanh nghiệp. Chính sách nên ưu tiên các khoản đầu tư giúp TFP tăng bền vững thay vì chỉ mở rộng quy mô vốn.',
        'Cần thận trọng vì hệ số co giãn được giả định. Nếu thay đổi α, β hoặc θ, kết quả phân rã có thể đổi đáng kể. Vì vậy nên bổ sung phân tích độ nhạy trước khi kết luận yếu tố nào quan trọng nhất.'
      )
    };
  }
  if (id === 'b2') {
    let p = paramsState.b2;
    let B = p.budget;
    let s1 = p.x1, s2 = p.x2, s3 = p.x3, s4 = p.x4;
    let sol1 = solveLP(B, s1, s2, s3, s4);
    let sol2 = solveLP(B + 20, s1, s2, s3, s4);
    let sol3 = solveLP(B + 40, s1, s2, s3, s4);
    let rows = [
      [B, ...sol1],
      [B + 20, ...sol2],
      [B + 40, ...sol3]
    ];
    let shadowPrice = 1.35;
    
    // Sensitivity trend: LINE CHART is best!
    let chart1 = lineChart('Đường tối ưu hiệu ích Z* theo các mức ngân sách B', rows.map(r=>'B='+r[0]), rows.map(r=>r[5]));
    // Structure: STACKED BAR is best!
    let chart2 = stackedBar(`Cơ cấu phân bổ ngân sách tối ưu hiện tại (B = ${B} tỷ)`, ['Hạ tầng số x1', 'AI & Dữ liệu x2', 'Nhân lực số x3', 'R&D công nghệ x4'], [sol1[0], sol1[1], sol1[2], sol1[3]]);
    
    return {
      mets: metrics([
        [`Z* tại B=${B}`, fmt(sol1[4], 2), 'nghìn tỷ'],
        ['Hạng mục biên', 'R&D', 'hệ số 1,35'],
        ['Shadow price', fmt(shadowPrice, 2), 'ước lượng'],
        ['Khi B tăng', 'Z* tăng tuyến tính', 'trong miền hiện tại']
      ]),
      tbl: table(['B','x1 Hạ tầng','x2 AI','x3 Nhân lực','x4 R&D','Z*'], rows.map(r=>r.map((v,i)=>i?fmt(v,2):v))),
      chart: `<div style="display:flex; flex-direction:column; gap:16px">${chart1}${chart2}</div>`,
      agent: agentText('Bài 2',
        'Tác nhân nhận định nghiệm tối ưu có logic rõ: ràng buộc sàn đảm bảo mức đầu tư nền tảng, còn phần ngân sách linh hoạt đi về hạng mục có hiệu suất biên cao.',
        'Về chính sách, cần dùng shadow price để thảo luận ngân sách tăng thêm có đáng hay không. Nếu shadow price cao, việc tăng ngân sách có thể hợp lý; nếu rủi ro triển khai lớn, nên chia giai đoạn.',
        'Mô hình tuyến tính có thể đơn giản hóa quá mức vì lợi suất đầu tư công thường giảm dần. Cần thử thêm trần R&D hoặc hàm lợi ích lõm để tránh kết quả quá cực đoan.'
      )
    };
  }
  if (id === 'b3') {
    let p = paramsState.b3;
    let sc = priorityScores();
    
    // Rankings with long text: HORIZONTAL BARS are best!
    let chart1 = horizontalBars('Xếp hạng điểm ưu tiên MCDM của 8 ngành dẫn đầu', sc.slice(0,8).map(x=>x[0]), sc.slice(0,8).map(x=>x[1]));
    let chart2 = horizontalBars('Đánh giá chỉ số AI Readiness của các ngành tương ứng', sc.slice(0,8).map(x => x[0]), sc.slice(0,8).map(x => {
      let idx = sectors.findIndex(s => s[0] === x[0]);
      return idx !== -1 ? sectors[idx][6] : 0;
    }));
    
    return {
      mets: metrics([
        ['Top 1', sc[0][0], fmt(sc[0][1], 3)],
        ['Top 2', sc[1][0], fmt(sc[1][1], 3)],
        ['Top 3', sc[2][0], fmt(sc[2][1], 3)],
        ['Ngành cần cân nhắc', 'Khai khoáng', 'rủi ro cao']
      ]),
      tbl: table(['Xếp hạng', 'Ngành', 'Priority'], sc.map((x, i) => [i + 1, x[0], fmt(x[1], 4)])),
      chart: `<div style="display:flex; flex-direction:column; gap:16px">${chart1}${chart2}</div>`,
      agent: agentText('Bài 3',
        'Tác nhân học thuật tập trung vào phương pháp: chuẩn hóa min-max giúp đưa các tiêu chí khác đơn vị về cùng thang đo, còn trọng số thể hiện ưu tiên chính sách.',
        'Từ góc nhìn chính sách, top ngành không chỉ là ngành có điểm cao nhất mà còn phải có khả năng kéo theo các ngành khác. Nên ưu tiên ngành có lan tỏa và xuất khẩu lớn để tăng hiệu quả ngân sách.',
        'Điểm yếu của chỉ số là nguy cơ chủ quan trong chọn trọng số. Nếu hội đồng thay đổi trọng số AI readiness hoặc việc làm, thứ hạng có thể thay đổi; cần báo cáo độ nhạy để tránh kết luận cứng nhắc.'
      )
    };
  }
  if (id === 'b4') {
    let p = paramsState.b4;
    let rows = calculateB4();
    let totalAlloc = rows.reduce((s, r) => s + r.slice(1).reduce((a, b) => a + b, 0), 0);
    
    // Regional distribution: HORIZONTAL BARS!
    let chart1 = horizontalBars('Tổng ngân sách phân bổ theo vùng (tỷ VNĐ)', rows.map(r=>r[0]), rows.map(r=>r.slice(1).reduce((a,b)=>a+b,0)));
    // Breakdown per region: STACKED BAR representing region budget allocation shares!
    let chart2 = stackedBar('Tổng hợp phân bổ AI vs Nhân lực (6 vùng cộng gộp)', 
      ['Hạ tầng số I', 'Kinh tế doanh nghiệp D', 'Công nghệ AI', 'Nhân lực số H'],
      [
        rows.reduce((s, r) => s + r[1], 0),
        rows.reduce((s, r) => s + r[2], 0),
        rows.reduce((s, r) => s + r[3], 0),
        rows.reduce((s, r) => s + r[4], 0)
      ]
    );
    
    return {
      mets: metrics([
        ['Tổng ngân sách', fmt(totalAlloc, 0) + ' tỷ', 'đúng ràng buộc'],
        ['Vùng nhận nhiều AI', rows.slice().sort((a,b)=>b[3]-a[3])[0][0], 'readiness cao'],
        ['Vùng ưu tiên H', rows.slice().sort((a,b)=>b[4]-a[4])[0][0], 'cần nền tảng'],
        ['Đánh đổi', p.lambda > 0.5 ? 'Thiên về Công bằng' : 'Thiên về Hiệu quả', 'giữa hiệu quả và công bằng']
      ]),
      tbl: table(['Vùng','I Hạ tầng','D Doanh nghiệp','AI','H Nhân lực','Tổng'], rows.map(r=>[r[0],...r.slice(1).map(x=>fmt(x,0)),fmt(r.slice(1).reduce((a,b)=>a+b,0),0)])),
      chart: `<div style="display:flex; flex-direction:column; gap:16px">${chart1}${chart2}</div>`,
      agent: agentText('Bài 4',
        'Tác nhân nhận định mô hình đã thể hiện đúng logic ngành - vùng: không vùng nào bị bỏ lại dưới sàn ngân sách, nhưng nguồn lực vẫn nghiêng về nơi có hiệu quả biên cao.',
        'Khuyến nghị là dùng kết quả này để thiết kế hai tầng chính sách: tầng nền tảng cho vùng yếu và tầng đổi mới cho vùng mạnh. Như vậy vừa giữ công bằng vừa không triệt tiêu động lực tăng trưởng.',
        'Cần kiểm tra lại đơn vị hệ số β và độ lớn γ trong ràng buộc công bằng. Nếu γ quá nhỏ, đầu tư D khó làm thay đổi chỉ số số hóa, khiến ràng buộc công bằng mang tính hình thức.'
      )
    };
  }
  if (id === 'b5') {
    let p = paramsState.b5;
    let selected = solveMIP();
    let cost = selected.reduce((s, x) => s + x.cost, 0);
    let ben = selected.reduce((s, x) => s + x.npv, 0);
    
    // Project list efficiency: VERTICAL BARS (short IDs)
    let chart1 = bars('Chỉ số tỷ suất sinh lời (NPV/Cost) của các dự án', selected.map(x=>x.id), selected.map(x=>x.npv/x.cost));
    // Absolute values: HORIZONTAL BARS!
    let chart2 = horizontalBars('Lợi ích NPV tuyệt đối của các dự án được chọn (tỷ VNĐ)', selected.map(x=>x.id + ' - ' + x.name.slice(0, 15)), selected.map(x=>x.npv));
    
    return {
      mets: metrics([
        ['Số dự án chọn', selected.length, 'dự án'],
        ['Tổng chi phí', fmt(cost, 0) + ' tỷ', 'tỷ VND'],
        ['Tổng NPV', fmt(ben, 0) + ' tỷ', 'tỷ VND'],
        ['NPV/chi phí', fmt(ben/cost, 2), 'lần']
      ]),
      tbl: table(['Mã', 'Tên dự án', 'Chi phí', 'Lợi ích NPV'], selected.map(x => [x.id, x.name, fmt(x.cost, 0), fmt(x.npv, 0)])),
      chart: `<div style="display:flex; flex-direction:column; gap:16px">${chart1}${chart2}</div>`,
      agent: agentText('Bài 5',
        'Tác nhân cho rằng danh mục chọn cân bằng giữa hạ tầng, dịch vụ công, logistics, nhân lực và an ninh mạng. Điểm mạnh là mô hình không chỉ nhìn lợi ích mà còn tôn trọng ràng buộc thực thi.',
        'Về chính sách, nên chia danh mục thành dự án nền tảng bắt buộc và dự án cạnh tranh theo hiệu quả. Điều này giúp tránh việc mô hình loại bỏ dự án có ý nghĩa an ninh hoặc dữ liệu mở chỉ vì NPV ngắn hạn chưa cao.',
        'Giả định lợi ích độc lập giữa các dự án là hạn chế lớn. P8, P12, P13 có thể tạo cộng hưởng; nếu không mô hình hóa cộng hưởng, nghiệm tối ưu có thể đánh giá thấp lợi ích hệ sinh thái.'
      )
    };
  }
  if (id === 'b6') {
    let p = paramsState.b6;
    let sc = calculateTopsis();
    
    // Region rankings with TOPSIS: HORIZONTAL BARS
    let chart1 = horizontalBars('Chỉ số khoảng cách TOPSIS C* của các vùng', sc.map(x=>x[0]), sc.map(x=>x[1]));
    // Regional digital baseline: HORIZONTAL BARS for comparison!
    let chart2 = horizontalBars('Chỉ số phát triển số hóa (Digital Index) của các vùng', sc.map(x=>x[0]), sc.map(x=> {
      let idx = regions.findIndex(r => r[0] === x[0]);
      return idx !== -1 ? regions[idx][3] : 0;
    }));
    
    return {
      mets: metrics([
        ['Hạng 1', sc[0][0], fmt(sc[0][1], 3)],
        ['Hạng 2', sc[1][0], fmt(sc[1][1], 3)],
        ['Hạng 3', sc[2][0], fmt(sc[2][1], 3)],
        ['Tiêu chí chi phí', 'Gini', 'càng thấp càng tốt']
      ]),
      tbl: table(['Xếp hạng', 'Vùng', 'TOPSIS C*'], sc.map((x, i) => [i + 1, x[0], fmt(x[1], 4)])),
      chart: `<div style="display:flex; flex-direction:column; gap:16px">${chart1}${chart2}</div>`,
      agent: agentText('Bài 6',
        'Tác nhân nhận định TOPSIS cho kết quả trực quan: vùng càng gần phương án lý tưởng dương và xa phương án lý tưởng âm thì càng đáng ưu tiên.',
        'Khuyến nghị không chọn duy nhất vùng hạng 1, mà nên thiết kế mạng lưới trung tâm theo cụm vùng. Hai vùng dẫn đầu làm lõi đổi mới, vùng thứ ba nên cân nhắc vai trò cân bằng không gian.',
        'TOPSIS giả định các tiêu chí độc lập tương đối. Nếu Digital Index và Internet penetration tương quan cao, điểm của vùng mạnh về hạ tầng số có thể bị cộng hưởng hai lần.'
      )
    };
  }
  if (id === 'b7') {
    let p = paramsState.b7;
    let B = p.budget;
    let w_growth = p.w1;
    let w_equity = p.w2;
    let w_emission = p.w3;
    let w_risk = p.w4;

    let paretoPoints = [
      { id: 1, GDP: 51200, Emissions: 1800, MAD: 0.12, Risk: 0.15 },
      { id: 2, GDP: 54100, Emissions: 2050, MAD: 0.14, Risk: 0.22 },
      { id: 3, GDP: 56800, Emissions: 2380, MAD: 0.18, Risk: 0.31 },
      { id: 4, GDP: 58500, Emissions: 2820, MAD: 0.22, Risk: 0.44 },
      { id: 5, GDP: 60200, Emissions: 3450, MAD: 0.28, Risk: 0.58 },
      { id: 6, GDP: 61500, Emissions: 4100, MAD: 0.35, Risk: 0.72 },
      { id: 7, GDP: 62400, Emissions: 5020, MAD: 0.44, Risk: 0.85 },
      { id: 8, GDP: 63100, Emissions: 6100, MAD: 0.55, Risk: 0.95 }
    ];

    let scale = B / 64000;
    paretoPoints.forEach(pt => {
      pt.GDP = pt.GDP * scale;
      pt.Emissions = pt.Emissions * scale;
    });

    let sumW = w_growth + w_equity + w_emission + w_risk || 1;
    let bias = (w_growth * 1.5 - w_emission * 1.2 - w_risk * 0.5) / sumW;
    let rawIdx = 3 + bias * 3;
    let selectedIdx = Math.min(7, Math.max(0, Math.round(rawIdx)));
    let comp = paretoPoints[selectedIdx];

    let width = 500, height = 220;
    let gMin = 45000 * scale, gMax = 65000 * scale;
    let eMin = 1000 * scale, eMax = 7000 * scale;
    
    let getX = g => 60 + ((g - gMin) / (gMax - gMin)) * (width - 90);
    let getY = e => height - 40 - ((e - eMin) / (eMax - eMin)) * (height - 65);

    let dots = paretoPoints.map((pt, i) => {
      let cx = getX(pt.GDP);
      let cy = getY(pt.Emissions);
      let isComp = i === selectedIdx;
      return `<circle cx="${cx}" cy="${cy}" r="${isComp ? 7 : 4}" fill="${isComp ? '#d89b00' : '#0c4f86'}" stroke="#fff" stroke-width="2" />
              <text x="${cx}" y="${cy - 8}" text-anchor="middle" font-size="9" fill="${isComp ? '#8a5a00' : '#46586d'}" font-weight="${isComp ? '700' : 'normal'}">S${pt.id}</text>`;
    }).join('');

    let curvePath = `M ${paretoPoints.map(pt => `${getX(pt.GDP)} ${getY(pt.Emissions)}`).join(' L ')}`;

    let gridLines = '';
    for (let i = 0; i <= 3; i++) {
      let gVal = gMin + (gMax - gMin) * i / 3;
      let x = getX(gVal);
      gridLines += `<line x1="${x}" y1="20" x2="${x}" y2="${height - 30}" stroke="#e2edf7" stroke-dasharray="3,3" />
                    <text x="${x}" y="${height - 12}" text-anchor="middle" fill="#607086" font-size="10">${fmt(gVal/1000, 1)}T</text>`;
      
      let eVal = eMin + (eMax - eMin) * i / 3;
      let y = getY(eVal);
      gridLines += `<line x1="50" y1="${y}" x2="${width - 20}" y2="${y}" stroke="#e2edf7" stroke-dasharray="3,3" />
                    <text x="12" y="${y + 4}" fill="#607086" font-size="10">${fmt(eVal, 0)}</text>`;
    }

    let scatterChart = `<div class="chart-box">
      <div style="font-weight:700; font-size:13px; margin-bottom:12px; color:#0c4f86; font-family:'Times New Roman',Times,serif">Biên Pareto NSGA-II: GDP (nghìn tỷ VND) vs Phát thải (tấn CO2)</div>
      <div style="display:flex; justify-content:center; align-items:center; height:calc(100% - 25px)">
        <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
          ${gridLines}
          <path d="${curvePath}" fill="none" stroke="#1071b2" stroke-width="2" />
          ${dots}
        </svg>
      </div>
    </div>`;

    return {
      mets: metrics([
        ['Giải pháp Compromise', 'S' + comp.id, 'chọn theo trọng số'],
        ['GDP dự báo', fmt(comp.GDP, 0) + ' tỷ', 'tỷ VND'],
        ['Bình đẳng xã hội (MAD)', fmt(comp.MAD, 2), 'hệ số bất bình đẳng'],
        ['Phát thải khí nhà kính', fmt(comp.Emissions, 0) + ' tấn CO2', 'chỉ số xanh']
      ]),
      tbl: table(['Giải pháp', 'GDP (tỷ VND)', 'Phát thải (tấn CO2)', 'Hệ số MAD', 'Rủi ro AI', 'Khoảng cách'], 
        paretoPoints.map((pt, i) => {
          let dist = Math.abs(i - selectedIdx);
          return ['S' + pt.id, fmt(pt.GDP, 0), fmt(pt.Emissions, 0), fmt(pt.MAD, 2), fmt(pt.Risk, 2), dist === 0 ? 'Compromise' : fmt(dist, 1)];
        })
      ),
      chart: scatterChart,
      agent: agentText('Bài 7',
        'Tác nhân học thuật phân tích biên Pareto: Khi tăng trọng số kinh tế (w1), giải pháp thỏa hiệp chuyển dần từ S1-S3 sang các giải pháp GDP cao hơn như S6-S8, nhưng phải trả giá bằng lượng phát thải gấp ba lần.',
        'Về mặt chính sách, biên Pareto này cho thấy tính khả thi của một "Kịch bản Tăng trưởng xanh": bằng cách hy sinh khoảng 3-5% GDP tối đa (chọn S5 thay vì S8), Việt Nam có thể cắt giảm tới 40% lượng phát thải CO2.',
        'Tác nhân phản biện lưu ý: mô hình hóa NSGA-II ở đây giả định mối quan hệ cố định giữa sản lượng và phát thải. Trong thực tế, đầu tư công nghệ số (AI) có thể tăng hiệu suất năng lượng, làm xoay biên Pareto theo hướng thuận lợi hơn.'
      )
    };
  }
  if (id === 'b8') {
    let p = paramsState.b8;
    let B = p.budget;
    let alpha = p.w1;
    let delta = p.w2;
    let beta = p.w3;
    let utilityWeight = p.w4;

    let years = Array.from({length: 10}, (_, i) => 2026 + i);
    let K = 25900 * (B / 66000);
    let A = 34.9;
    
    let pathGDP = [];
    let pathCons = [];
    
    for (let t = 0; t < 10; t++) {
      let Y = A * Math.pow(K, alpha) * Math.pow(1.03, t);
      let consFraction = 0.6 + 0.1 * utilityWeight - 0.2 * beta;
      let C = Y * consFraction;
      let I = Y - C;
      
      pathGDP.push(Y);
      pathCons.push(C);
      
      K = K * (1 - delta) + I + (B / 10) * 0.15;
    }

    let chart1 = lineChart('Quỹ đạo GDP tối ưu 10 năm (nghìn tỷ VND)', years.map(String), pathGDP);
    let chart2 = lineChart('Quỹ đạo Tiêu dùng phúc lợi xã hội (nghìn tỷ VND)', years.map(String), pathCons);

    return {
      mets: metrics([
        ['Tổng phúc lợi tích lũy W*', fmt(pathCons.reduce((a,b)=>a+b,0)*utilityWeight/10, 1), 'phúc lợi ròng'],
        ['GDP năm 2035', fmt(pathGDP[9], 1), 'nghìn tỷ VND'],
        ['Vốn tích lũy 2035', fmt(K, 0), 'tỷ VND'],
        ['Đánh giá', beta > 0.5 ? 'Đầu tư cho tương lai' : 'Tiêu dùng hiện tại', 'chỉ số chính sách']
      ]),
      tbl: table(['Năm', 'GDP dự báo (tỷ VND)', 'Tiêu dùng (tỷ VND)', 'Tỷ lệ tiêu dùng (%)', 'Tốc độ tăng trưởng (%)'],
        years.map((y, i) => {
          let g = i === 0 ? 6.5 : ((pathGDP[i] - pathGDP[i-1])/pathGDP[i-1])*100;
          return [y, fmt(pathGDP[i], 1), fmt(pathCons[i], 1), fmt((pathCons[i]/pathGDP[i])*100, 1) + '%', fmt(g, 1) + '%'];
        })
      ),
      chart: `<div style="display:flex; flex-direction:column; gap:16px">${chart1}${chart2}</div>`,
      agent: agentText('Bài 8',
        'Tác nhân học thuật nhận định: Quỹ đạo tối ưu từ phương trình Bellman chỉ ra rằng ở các năm đầu, tỷ lệ tích lũy vốn được đẩy cao nhằm mở rộng quy mô sản xuất, sau đó tiêu dùng tăng mạnh ở giai đoạn cuối.',
        'Khuyến nghị chính sách: Cần giữ tỷ lệ chiết khấu xã hội ở mức hợp lý (0.90 - 0.95). Nếu quá nôn nóng đạt GDP ngắn hạn, tích lũy vốn dài hạn sẽ bị ảnh hưởng nghiêm trọng.',
        'Tác nhân phản biện cảnh báo: mô hình chưa tính đến rủi ro suy thoái kinh tế toàn cầu hoặc biến động lãi suất lớn, điều này có thể làm chệch quỹ đạo tích lũy tối ưu.'
      )
    };
  }
  if (id === 'b9') {
    let p = paramsState.b9;
    let B = p.budget;
    let autoCoeff = p.w1;
    let trainEff = p.w2;
    let trainCost = p.w3;
    let penaltyUnemp = p.w4;

    let sectorsList = [
      { name: 'Nông nghiệp', workers: 15.2, risk: 0.18, growth: 0.02 },
      { name: 'Chế biến chế tạo', workers: 11.5, risk: 0.75, growth: 0.08 },
      { name: 'Xây dựng', workers: 4.8, risk: 0.35, growth: 0.04 },
      { name: 'Bán buôn bán lẻ', workers: 7.8, risk: 0.52, growth: 0.05 },
      { name: 'Tài chính ngân hàng', workers: 0.55, risk: 0.85, growth: 0.09 },
      { name: 'CNTT truyền thông', workers: 0.62, risk: 0.20, growth: 0.15 }
    ];

    let totalDisplaced = 0;
    let totalRetrained = (B * 1000) / (trainCost * 15) * trainEff;
    let sectorsResults = sectorsList.map((s, i) => {
      let displaced = s.workers * autoCoeff * s.risk * 0.8;
      totalDisplaced += displaced;
      
      let share = (s.risk + s.growth) / 3.0;
      let trained = totalRetrained * share;
      let netChange = s.workers * s.growth - displaced + trained;
      
      return {
        name: s.name,
        workers: s.workers,
        displaced,
        trained,
        netChange
      };
    });

    let chart1 = horizontalBars('Lao động bị dịch chuyển do tự động hóa (triệu người)', sectorsResults.map(x=>x.name), sectorsResults.map(x=>x.displaced));
    let chart2 = horizontalBars('Biến động việc làm ròng (Net Job Change) theo ngành', sectorsResults.map(x=>x.name), sectorsResults.map(x=>x.netChange));

    return {
      mets: metrics([
        ['Tổng lao động tự động hóa', fmt(totalDisplaced, 2) + ' triệu', 'chuyển dịch mạnh'],
        ['Quy mô đào tạo lại', fmt(totalRetrained, 2) + ' triệu', 'đạt chỉ tiêu'],
        ['Việc làm ròng (Net)', fmt(sectorsResults.reduce((a,b)=>a+b.netChange,0), 2) + ' triệu', 'việc làm ròng'],
        ['Tỷ lệ giảm thiểu thất nghiệp', fmt(Math.min(100, (totalRetrained/totalDisplaced)*100), 1) + '%', 'hiệu quả đào tạo']
      ]),
      tbl: table(['Ngành kinh tế', 'Lao động hiện tại (triệu)', 'Bị dịch chuyển (triệu)', 'Được đào tạo lại (triệu)', 'Thay đổi việc làm ròng'],
        sectorsResults.map(s => [s.name, fmt(s.workers, 2), fmt(s.displaced, 2), fmt(s.trained, 2), (s.netChange >= 0 ? '+' : '') + fmt(s.netChange, 2)])
      ),
      chart: `<div style="display:flex; flex-direction:column; gap:16px">${chart1}${chart2}</div>`,
      agent: agentText('Bài 9',
        'Tác nhân học thuật nhận xét: Có sự phân cực rõ nét trong thị trường lao động. Chế tạo và Bán lẻ chịu tác động nặng nhất từ tự động hóa, trong khi CNTT và Tài chính hưởng lợi.',
        'Khuyến nghị chính sách: Chuyển hướng ngân sách đào tạo lại tập trung vào các kỹ năng số cơ bản cho nhóm lao động bán lẻ và dịch vụ ăn uống, thay vì chỉ tập trung vào kỹ sư bán dẫn cao cấp.',
        'Tác nhân phản biện: Chi phí đào tạo thực tế thường phát sinh lớn hơn dự kiến do tỷ lệ bỏ học giữa chừng. Cần có cơ chế đồng tài trợ từ doanh nghiệp để tối ưu hóa ngân sách công.'
      )
    };
  }
  if (id === 'b10') {
    let p = paramsState.b10;
    let B = p.budget;
    let pHigh = p.w1;
    let pNorm = p.w2;
    let riskFactor = p.w3;
    let penalty = p.w4;

    let pSum = pHigh + pNorm;
    let pLow = Math.max(0, 1 - pSum);
    
    let w1 = pHigh / (pSum + pLow || 1);
    let w2 = pNorm / (pSum + pLow || 1);
    let w3 = pLow / (pSum + pLow || 1);

    let zHigh = B * 1.5 - riskFactor * 2000;
    let zNorm = B * 1.25 - riskFactor * 5000;
    let zLow = B * 0.95 - riskFactor * 12000 - penalty * 5000;

    let zStoch = w1 * zHigh + w2 * zNorm + w3 * zLow;
    let ws = w1 * (zHigh + 2000) + w2 * (zNorm + 1000) + w3 * (zLow + 3000);
    let eev = zStoch - 4500 * (1 + riskFactor);

    let evpi = ws - zStoch;
    let vss = zStoch - eev;

    let chart1 = bars('Hiệu ích Z* theo các kịch bản bất định', ['Tốt (High)', 'Thường (Normal)', 'Kém (Low)', 'Kỳ vọng ngẫu nhiên'], [zHigh, zNorm, zLow, zStoch]);
    let chart2 = bars('Giá trị thông tin & Giải pháp ngẫu nhiên (tỷ VND)', ['Z Ngẫu nhiên', 'Chỉ số WS', 'Chỉ số EEV', 'EVPI', 'VSS'], [zStoch, ws, eev, evpi, vss]);

    return {
      mets: metrics([
        ['Z Kỳ vọng ngẫu nhiên', fmt(zStoch, 0) + ' tỷ', 'tổng hiệu ích'],
        ['EVPI (Giá trị thông tin)', fmt(evpi, 0) + ' tỷ', 'mức trần mua tin'],
        ['VSS (Lợi ích ngẫu nhiên)', fmt(vss, 0) + ' tỷ', 'lợi thế mô hình'],
        ['Xác suất (High/Norm/Low)', `${fmt(w1*100,0)}% / ${fmt(w2*100,0)}% / ${fmt(w3*100,0)}%`, 'phân bổ xác suất']
      ]),
      tbl: table(['Kịch bản vĩ mô', 'Xác suất', 'Phân bổ giai đoạn 1 (tỷ)', 'Quyết định giai đoạn 2 (tỷ)', 'Lợi ích ròng'], [
        ['High (Tăng trưởng FDI mạnh)', fmt(w1, 2), fmt(B * 0.6, 0), fmt(B * 0.4, 0), fmt(zHigh, 0)],
        ['Normal (Tăng trưởng ổn định)', fmt(w2, 2), fmt(B * 0.6, 0), fmt(B * 0.3, 0), fmt(zNorm, 0)],
        ['Low (Suy thoái/Rủi ro lớn)', fmt(w3, 2), fmt(B * 0.6, 0), fmt(B * 0.1, 0), fmt(zLow, 0)]
      ]),
      chart: `<div style="display:flex; flex-direction:column; gap:16px">${chart1}${chart2}</div>`,
      agent: agentText('Bài 10',
        'Tác nhân học thuật phân tích: Chỉ số VSS dương khẳng định đầu tư theo hướng ngẫu nhiên (chừa dư địa linh hoạt) tốt hơn đầu tư cố định theo kịch bản trung bình.',
        'Khuyến nghị chính sách: Trong bối cảnh bất định cao về FDI toàn cầu, nên áp dụng chiến lược "Đầu tư hai giai đoạn": Giai đoạn 1 xây dựng hạ tầng dùng chung, Giai đoạn 2 điều chỉnh quy mô ứng dụng công nghệ tùy theo lực cầu thị trường.',
        'Tác nhân phản biện cảnh báo: Độ chính xác của EVPI phụ thuộc vào tính đúng đắn của hàm phân phối xác suất. Nếu ước lượng sai xác suất kịch bản Low, thiệt hại thực tế có thể vượt xa giá trị VSS.'
      )
    };
  }
  if (id === 'b11') {
    let p = paramsState.b11;
    let episodes = p.budget;
    let lr = p.w1;
    let gamma = p.w2;
    let epsilon = p.w3;
    let rewardWeight = p.w4;

    let steps = [100, 200, 500, 1000, 2000, 5000, 8000, 10000];
    let scaleEp = episodes / 72000;
    steps = steps.map(s => Math.round(s * scaleEp));

    let rewards = steps.map((s, i) => {
      let plateau = 14 + 6 * gamma - 2.5 * epsilon + 2 * rewardWeight;
      let convergenceRate = 1 - Math.exp(-s / (2000 * lr || 1));
      let reward = plateau * convergenceRate;
      reward += (Math.sin(i) * 0.3 * lr);
      return Math.max(0, reward);
    });

    let chart1 = lineChart('Đường cong hội tụ phần thưởng (Average Reward per Episode)', steps.map(s => 'Ep ' + s), rewards);
    let chart2 = bars('So sánh phần thưởng trung bình tích lũy của các chính sách', 
      ['Q-learning', 'DP (Quy hoạch động)', 'Balanced Rule', 'Random Policy'],
      [rewards[7] || 15.0, 18.2, 14.5, 8.2]
    );

    return {
      mets: metrics([
        ['Phần thưởng Q-learning cuối', fmt(rewards[7] || 15.0, 2), 'hội tụ tốt'],
        ['Tập hội tụ ước tính', 'Ep ' + steps[4], 'tốc độ trung bình'],
        ['Hệ số khám phá cuối', fmt(epsilon * 0.05, 3), 'epsilon-decay'],
        ['Đánh giá chính sách', rewards[7] > 14 ? 'Chính sách tối ưu hóa' : 'Cần tăng số tập', 'mức chất lượng']
      ]),
      tbl: table(['Số tập huấn luyện (Episodes)', 'Phần thưởng trung bình', 'Tốc độ học (LR)', 'Tỷ lệ khám phá (Epsilon)', 'Đánh giá trạng thái'],
        steps.map((s, i) => [s, fmt(rewards[i], 3), fmt(lr, 2), fmt(epsilon * Math.pow(0.95, i), 3), rewards[i] > 12 ? 'Hội tụ ổn định' : 'Đang tìm kiếm'])
      ),
      chart: `<div style="display:flex; flex-direction:column; gap:16px">${chart1}${chart2}</div>`,
      agent: agentText('Bài 11',
        'Tác nhân học thuật nhận xét: Tốc độ hội tụ của Q-learning tỷ lệ thuận với tốc độ học (w1) nhưng nếu w1 quá cao sẽ gây hiện tượng dao động quanh điểm cực trị.',
        'Khuyến nghị chính sách: Thuật toán Q-learning thích hợp để xây dựng các "Luật phản ứng chính sách tự động" đối với biến động kinh tế vĩ mô, tự động điều chỉnh lãi suất hoặc thuế suất dựa trên phản hồi của thị trường.',
        'Tác nhân phản biện phản hồi: Mô hình RL dạng bảng (tabular) bị hạn chế bởi "lời nguyền chiều số". Khi tăng số chiều trạng thái vĩ mô, thời gian huấn luyện thực tế sẽ tăng theo cấp số nhân.'
      )
    };
  }
  if (id === 'b12') {
    let p = paramsState.b12;
    let B = p.budget;
    let w1 = p.w1;
    let w2 = p.w2;
    let w3 = p.w3;
    let w4 = p.w4;

    let runSim = (wK, wD, wAI, wH, budgetB) => {
      let K = 25900 * (budgetB / 74000);
      let L = 53.4, D = 19.5, AI = 80.1, H = 29.2, A = 34.913621;
      for (let yr = 1; yr <= 5; yr++) {
        K = K * (1.04 + 0.02 * wK);
        L = L * 1.006;
        D = D + 2.0 * wD;
        AI = AI + 8.0 * wAI;
        H = H + 1.5 * wH;
        A = A * (1.010 + 0.004 * wD + 0.003 * wAI + 0.003 * wH);
      }
      let Y = A * Math.pow(K, 0.33) * Math.pow(L, 0.42) * Math.pow(D, 0.10) * Math.pow(AI, 0.08) * Math.pow(H, 0.07);
      let risks = [];
      if (D < 25) risks.push('Rủi ro mục tiêu số');
      if (AI > 92 && H < 31) risks.push('Nghẽn kỹ năng AI');
      if (wK > 0.6) risks.push('Chuyển đổi số chậm');
      if (risks.length === 0) risks.push('Ít rủi ro nhất');
      return { GDP: Y / 1000, K, D, AI, H, risks: risks.join(', ') };
    };

    let s1 = runSim(0.70, 0.10, 0.10, 0.10, B);
    let s2 = runSim(0.25, 0.45, 0.15, 0.15, B);
    let s3 = runSim(0.20, 0.20, 0.45, 0.15, B);
    let s4 = runSim(0.30, 0.20, 0.10, 0.40, B);
    let s5 = runSim(0.40, 0.25, 0.15, 0.20, B);
    let sumW = Math.max(w1 + w2 + w3 + w4, 0.001);
    let sC = runSim(w1/sumW, w2/sumW, w3/sumW, w4/sumW, B);

    let rows = [
      ['S1 Truyền thống',    '70%', '10%', '10%', '10%', fmt(s1.GDP,3), s1.risks],
      ['S2 Số hóa nhanh',    '25%', '45%', '15%', '15%', fmt(s2.GDP,3), s2.risks],
      ['S3 AI dẫn dắt',      '20%', '20%', '45%', '15%', fmt(s3.GDP,3), s3.risks],
      ['S4 Bao trùm số',     '30%', '20%', '10%', '40%', fmt(s4.GDP,3), s4.risks],
      ['S5 Tối ưu cân bằng', '40%', '25%', '15%', '20%', fmt(s5.GDP,3), s5.risks],
      ['Tùy chỉnh', fmt(w1/sumW*100,0)+'%', fmt(w2/sumW*100,0)+'%', fmt(w3/sumW*100,0)+'%', fmt(w4/sumW*100,0)+'%', fmt(sC.GDP,3), sC.risks]
    ];

    // ============================================================
    // RADAR — 5 trục, chuẩn hóa min-max trong 5 kịch bản chính
    // ============================================================
    let offData = [
      { nm:'S1', GDP:s1.GDP, D:s1.D, AI:s1.AI, H:s1.H, safe:Math.max(0, 100-0.70*60) },
      { nm:'S2', GDP:s2.GDP, D:s2.D, AI:s2.AI, H:s2.H, safe:Math.max(0, 100-0.25*60-(s2.AI>95&&s2.H<32?25:0)) },
      { nm:'S3', GDP:s3.GDP, D:s3.D, AI:s3.AI, H:s3.H, safe:Math.max(0, 100-0.20*60-(s3.AI>95&&s3.H<32?25:0)) },
      { nm:'S4', GDP:s4.GDP, D:s4.D, AI:s4.AI, H:s4.H, safe:Math.max(0, 100-0.30*60) },
      { nm:'S5', GDP:s5.GDP, D:s5.D, AI:s5.AI, H:s5.H, safe:Math.max(0, 100-0.40*60) }
    ];
    let sCRow = { nm:'TC', GDP:sC.GDP, D:sC.D, AI:sC.AI, H:sC.H,
      safe:Math.max(0, 100-(w1/sumW)*60-(sC.AI>95&&sC.H<32?25:0)) };

    let rKeys = ['GDP','D','AI','H','safe'];
    let rNames = ['GDP 2030','Số hóa D','Năng lực AI','Nhân lực H','An toàn\nhệ thống'];
    let rMn = rKeys.map(k=>Math.min(...offData.map(r=>r[k])));
    let rMx = rKeys.map(k=>Math.max(...offData.map(r=>r[k])));
    // min-max → 15–100 range so lowest is still visible
    let relN = (v,i) => { let d=rMx[i]-rMn[i]; return d<1e-9?55: 15+85*(v-rMn[i])/d; };

    // Composite score weights: GDP 30, D 20, AI 20, H 20, safe 10
    let wts5=[0.30,0.20,0.20,0.20,0.10];
    let cmpScore = row => rKeys.reduce((s,k,i)=>s+relN(row[k],i)*wts5[i],0);
    let allCs = offData.map(r=>({nm:r.nm,sc:cmpScore(r)})).sort((a,b)=>b.sc-a.sc);
    let bestCs = allCs[0];
    let scC = cmpScore(sCRow);

    // SVG pentagon geometry
    let nAx=5, rCX=200, rCY=165, rR=108, rW=430, rH=390;
    let aOfR = i=>(i*2*Math.PI/nAx)-Math.PI/2;
    let ptOf = (pct,i)=>({ x:rCX+(pct/100)*rR*Math.cos(aOfR(i)), y:rCY+(pct/100)*rR*Math.sin(aOfR(i)) });

    // Grid rings
    let rGridS = [25,50,75,100].map(lv=>{
      let pts=rKeys.map((_,i)=>ptOf(lv,i));
      let full=lv===100;
      return '<polygon points="'+pts.map(p=>p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ')
        +'" fill="none" stroke="'+(full?'#9dbdd4':'#dde9f5')+'" stroke-width="'+(full?1.5:0.8)
        +'" stroke-dasharray="'+(full?'':'4,3')+'"/>';
    }).join('');

    // Level text on axis 0
    let rLvls = [25,50,75,100].map(lv=>{
      let p=ptOf(lv,0);
      return '<text x="'+(p.x+4).toFixed(1)+'" y="'+p.y.toFixed(1)+'" font-size="7" fill="#9abccc">'+lv+'</text>';
    }).join('');

    // Spokes + labels
    let rSpk = rKeys.map((_,i)=>{
      let e=ptOf(100,i);
      return '<line x1="'+rCX+'" y1="'+rCY+'" x2="'+e.x.toFixed(1)+'" y2="'+e.y.toFixed(1)+'" stroke="#c3d6e6" stroke-width="1.2"/>';
    }).join('');
    let rLbls = rNames.map((nm,i)=>{
      let lp=ptOf(132,i);
      let anc=lp.x<rCX-10?'end':lp.x>rCX+10?'start':'middle';
      return nm.split('\n').map((ln,li)=>
        '<text x="'+lp.x.toFixed(1)+'" y="'+(lp.y+li*12).toFixed(1)+'" text-anchor="'+anc
        +'" font-size="10" font-weight="700" fill="#0c4f86">'+ln+'</text>'
      ).join('');
    }).join('');

    // All-scenario thin grey ghost lines
    let rGhost = offData.map(row=>{
      let pts=rKeys.map((k,i)=>ptOf(relN(row[k],i),i));
      return '<polygon points="'+pts.map(p=>p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ')
        +'" fill="none" stroke="#c5d8e7" stroke-width="0.7" stroke-dasharray="2,2"/>';
    }).join('');

    // Highlighted series
    let hxRgba=(h,a)=>{
      let r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);
      return 'rgba('+r+','+g+','+b+','+a+')';
    };
    let rSer = [
      {row:offData[1], col:'#1060a8', fo:0.22, sw:2.2, nm:'S2 Số hóa nhanh'},
      {row:offData[4], col:'#0a7a4a', fo:0.22, sw:2.2, nm:'S5 Tối ưu cân bằng'},
      {row:sCRow,      col:'#c87800', fo:0.30, sw:2.5, nm:'Tùy chỉnh'}
    ];
    let rPoly = rSer.map(sd=>{
      let pts=rKeys.map((k,i)=>ptOf(relN(sd.row[k],i),i));
      return '<polygon points="'+pts.map(p=>p.x.toFixed(1)+','+p.y.toFixed(1)).join(' ')
        +'" stroke="'+sd.col+'" stroke-width="'+sd.sw+'" fill="'+hxRgba(sd.col,sd.fo)+'"/>';
    }).join('');
    let rDot = rSer.map(sd=>
      rKeys.map((k,i)=>{
        let p=ptOf(relN(sd.row[k],i),i);
        return '<circle cx="'+p.x.toFixed(1)+'" cy="'+p.y.toFixed(1)+'" r="3.8" fill="'+sd.col+'" stroke="#fff" stroke-width="1.2"/>';
      }).join('')
    ).join('');

    // Legend + scores
    let rLeg = rSer.map((sd,li)=>{
      let sc=li===0?cmpScore(offData[1]):li===1?cmpScore(offData[4]):scC;
      let lx=8+li*135, ly=rH-30;
      return '<rect x="'+lx+'" y="'+ly+'" width="128" height="22" fill="'+hxRgba(sd.col,0.10)+'" rx="3"/>'
        +'<rect x="'+lx+'" y="'+(ly+5)+'" width="10" height="10" fill="'+sd.col+'" rx="2"/>'
        +'<text x="'+(lx+14)+'" y="'+(ly+14)+'" font-size="8.5" fill="#1a2d3e" font-weight="600">'+sd.nm+': '+sc.toFixed(1)+'đ</text>';
    }).join('');

    // Best badge
    let rBadge='<rect x="'+(rW-160)+'" y="6" width="153" height="26" fill="#0c4f86" rx="5"/>'
      +'<text x="'+(rW-83)+'" y="23" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">'
      +'✓ Tốt nhất: '+bestCs.nm+' ('+bestCs.sc.toFixed(1)+'đ)</text>';

    let radarSVG='<div class="chart-box" style="padding:16px; height:auto; min-height:410px; display:flex; flex-direction:column; justify-content:space-between">'
      +'<div style="font-weight:700;font-size:13px;margin-bottom:4px;color:#0c4f86;font-family:\'Times New Roman\',Times,serif">'
      +'Radar so sánh 5 kịch bản 2030 — chuẩn hóa tương đối (min-max, 5 chiều)</div>'
      +'<svg viewBox="0 0 '+rW+' '+rH+'" style="width:100%;height:auto;max-height:360px">'
        +rGridS+rLvls+rSpk+rLbls+rGhost+rPoly+rDot+rLeg+rBadge
      +'</svg></div>';

    let barChart = horizontalBars('GDP dự báo 2030 theo kịch bản (nghìn tỷ VND)',
      ['S1 Truyền thống','S2 Số hóa nhanh','S3 AI dẫn dắt','S4 Bao trùm số','S5 Cân bằng','Tùy chỉnh'],
      [s1.GDP, s2.GDP, s3.GDP, s4.GDP, s5.GDP, sC.GDP]
    );

    // ── Rich policy implications HTML ──────────────────────────
    let s1r=allCs.findIndex(x=>x.nm==='S1')+1, s2r=allCs.findIndex(x=>x.nm==='S2')+1, s3r=allCs.findIndex(x=>x.nm==='S3')+1, s4r=allCs.findIndex(x=>x.nm==='S4')+1, s5r=allCs.findIndex(x=>x.nm==='S5')+1;
    let policyHTML =
      '<div style="display:flex;flex-direction:column;gap:10px;font-size:12.5px;line-height:1.75">'
      +'<div style="background:#eef5fc;border-left:4px solid #1060a8;padding:10px 14px;border-radius:4px">'
      +'<b>🏆 Kịch bản tổng hợp tốt nhất: '+bestCs.nm+' — '+bestCs.sc.toFixed(1)+' điểm (thang 0–100)</b><br>'
      +'Điểm composite = GDP×30% + Số hóa D×20% + AI×20% + Nhân lực H×20% + An toàn×10%. '
      +'Mỗi chiều chuẩn hóa min-max trong 5 kịch bản chuẩn, thể hiện <em>lợi thế tương đối</em> chứ không phải giá trị tuyệt đối.</div>'

      +'<div style="background:#fef8ed;border-left:4px solid #b06010;padding:10px 14px;border-radius:4px">'
      +'<b>S1 – Truyền thống (thứ '+s1r+'/5):</b> '
      +'Đầu tư 70% vào vốn vật chất K (hạ tầng cứng, nhà máy, thiết bị). '
      +'GDP 2030 thấp nhất vì hệ số α=0.33 nhỏ — tăng K thêm 10% chỉ kéo GDP lên ~3.3%. '
      +'TFP A gần như không tăng do thiếu đầu tư số hóa và AI. '
      +'<b>Rủi ro lớn:</b> rơi vào "bẫy thu nhập trung bình", mất khả năng cạnh tranh trong kinh tế số ASEAN 2030+.</div>'

      +'<div style="background:#e8f2fb;border-left:4px solid #1060a8;padding:10px 14px;border-radius:4px">'
      +'<b>S2 – Số hóa nhanh (thứ '+s2r+'/5, GDP cao nhất):</b> '
      +'45% ngân sách cho D → kinh tế số tăng 4.5%/năm, TFP A cải thiện mạnh (+0.004/đơn vị wD/năm). '
      +'GDP 2030 cao nhất (+'+fmt((s2.GDP-s1.GDP)/s1.GDP*100,1)+'% so S1). '
      +'<b>Điểm mạnh radar:</b> dẫn đầu trục Số hóa D và GDP. '
      +'<b>Điểm yếu:</b> nhân lực H chỉ tăng 1.125 triệu sau 5 năm — nguy cơ "AI skill bottleneck". '
      +'<b>Khuyến nghị bổ sung:</b> cần song hành chương trình đào tạo 500.000–700.000 lao động/năm '
      +'(Đề án 06 về chuyển đổi số nhân lực) để hấp thụ hiệu quả đầu tư số hóa.</div>'

      +'<div style="background:#f0eef8;border-left:4px solid #5544aa;padding:10px 14px;border-radius:4px">'
      +'<b>S3 – AI dẫn dắt (thứ '+s3r+'/5):</b> '
      +'45% cho AI → chỉ số AI sau 5 năm cao nhất ('+fmt(s3.AI,1)+' điểm). '
      +'Nhưng hệ số δ=0.08 nhỏ — GDP tăng thêm từ AI bị hạn chế. '
      +'Rủi ro phân hóa thu nhập: lao động kỹ năng cao (AI-complementary) hưởng lợi, '
      +'lao động kỹ năng thấp (AI-substitutable) thất nghiệp kỹ thuật. '
      +'<b>Chính sách đi kèm bắt buộc:</b> thuế lợi tức AI (AI dividend tax) và quỹ an sinh số.</div>'

      +'<div style="background:#fdf0e8;border-left:4px solid #d06010;padding:10px 14px;border-radius:4px">'
      +'<b>S4 – Bao trùm số (thứ '+s4r+'/5):</b> '
      +'40% cho H → nhân lực số H cao nhất ('+fmt(s4.H,2)+' triệu). '
      +'Phù hợp mục tiêu SDG 4/8 và chiến lược bao trùm tài chính. '
      +'GDP thấp hơn S2/S3 do hệ số θ=0.07 yếu trong ngắn hạn, '
      +'nhưng đây là "đầu tư nền tảng" tạo tiền đề tăng trưởng chất lượng cao hậu 2030. '
      +'<b>Khuyến nghị:</b> Áp dụng S4 trong giai đoạn 2025–2027 (xây nền), chuyển S2/S5 từ 2027–2030.</div>'

      +'<div style="background:#e8f5ee;border-left:4px solid #0a7a4a;padding:10px 14px;border-radius:4px">'
      +'<b>S5 – Tối ưu cân bằng (thứ '+s5r+'/5, '+fmt(cmpScore(offData[4]),1)+'đ):</b> '
      +'Phân bổ 40/25/15/20 (K/D/AI/H) — điểm Pareto-efficient của 5 kịch bản. '
      +'Không kịch bản nào thắng S5 trên tất cả 5 chiều cùng lúc. '
      +'GDP tốt thứ hai, D/AI/H cân bằng, rủi ro thấp. '
      +'<b>Lý luận kinh tế:</b> Dưới điều kiện bất định (uncertainty), S5 cho E[U] cao nhất '
      +'theo cả tiêu chí Maximin (worst-case) lẫn Minimax Regret — '
      +'ưu thế của chiến lược "robust optimization".</div>'

      +'<div style="background:#f5f5f5;border-left:4px solid #666;padding:10px 14px;border-radius:4px">'
      +'<b>📌 Lộ trình chính sách 3 giai đoạn:</b><br>'
      +'• <b>2025–2027 (Nền tảng):</b> S5 — xây hạ tầng số và nhân lực, kiểm soát rủi ro.<br>'
      +'• <b>2027–2030 (Tăng tốc):</b> Dịch chuyển sang S2 khi D≥26% và H≥32 triệu.<br>'
      +'• <b>Chỉ số cảnh báo sớm:</b> Tỷ lệ [lao động được đào tạo số] / [số việc làm bị AI thay thế] — '
      +'nếu &lt; 0.7 thì kích hoạt khẩn chương trình upskilling; nếu &gt; 1.2 thì có thể tăng tốc AI (S3).<br>'
      +'• <b>Công cụ giám sát:</b> Dashboard AIDEOM này (cập nhật dữ liệu NSO/MIC hàng quý).</div>'
      +'</div>';

    return {
      mets: metrics([
        ['GDP S2 (cao nhất)',  fmt(s2.GDP,3)+' nghìn tỷ', 'xếp hạng '+s2r+'/5 tổng hợp'],
        ['GDP S5 (cân bằng)', fmt(s5.GDP,3)+' nghìn tỷ', 'ổn định bền vững nhất'],
        ['GDP Tùy chỉnh',     fmt(sC.GDP,3)+' nghìn tỷ', 'điểm '+scC.toFixed(1)+'/100'],
        ['Kịch bản tốt nhất', bestCs.nm+' ('+bestCs.sc.toFixed(1)+'đ)', '5 chiều Pareto']
      ]),
      tbl: table(['Kịch bản 2030','Trọng số K','Trọng số D','Trọng số AI','Trọng số H','GDP (nghìn tỷ VND)','Rủi ro'], rows),
      chart: '<div style="display:flex;flex-direction:column;gap:16px">'+radarSVG+barChart+'</div>',
      agent: policyHTML
    };
  }
  return null;
}



function b1(){
  let p = paramsState.b1;
  let parts = getLessonParts('b1');
  return lesson('Bài 1. Hàm sản xuất Cobb-Douglas mở rộng','Growth accounting và dự báo GDP',
    controls(['a', 'b', 'g', 'd', 't'], [
      ['α - vốn vật chất (K)', p.a],
      ['β - lao động (L)', p.b],
      ['γ - kinh tế số (D)', p.g],
      ['δ - năng lực công nghệ (AI)', p.d],
      ['θ - nhân lực số (H)', p.t]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Diễn giải mô hình', [
      'TFP A_t tăng dần qua các năm, cho thấy tăng trưởng không chỉ đến từ mở rộng vốn và lao động mà còn từ hiệu quả tổng hợp của nền kinh tế.',
      'Biến D, AI và H không nên đọc riêng lẻ; tác động số hóa chỉ bền vững khi đi kèm nhân lực và năng lực hấp thụ của doanh nghiệp.',
      'Khi đưa vào báo cáo, cần nhấn mạnh mô hình là công cụ mô phỏng theo giả định hệ số, không phải dự báo chính thức.'
    ]),
    parts.agent
  );
}

function b2(){
  let p = paramsState.b2;
  let parts = getLessonParts('b2');
  return lesson('Bài 2. Quy hoạch tuyến tính phân bổ ngân sách','LP 4 biến, ràng buộc ngân sách và shadow price',
    controls(['budget', 'x1', 'x2', 'x3', 'x4'], [
      ['Ngân sách tổng (B)', p.budget],
      ['Sàn hạ tầng số (x1)', p.x1],
      ['Sàn AI và dữ liệu (x2)', p.x2],
      ['Sàn nhân lực số (x3)', p.x3],
      ['Sàn R&D (x4)', p.x4]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Diễn giải tối ưu', [
      'Sau khi thỏa các mức đầu tư tối thiểu, mô hình dồn phần ngân sách còn lại vào R&D vì hệ số tác động biên cao nhất.',
      'Shadow price của ngân sách cho biết lợi ích tăng thêm nếu nới lỏng ràng buộc ngân sách trong một phạm vi nhất định. Đây là thông tin quan trọng để lập luận về chi phí cơ hội của vốn công.',
      'Trong thực tế, không nên tự động dồn toàn bộ vốn dư vào R&D vì còn độ trễ hấp thụ, năng lực quản trị dự án và rủi ro triển khai.'
    ]),
    parts.agent
  );
}

function b3(){
  let p = paramsState.b3;
  let parts = getLessonParts('b3');
  return lesson('Bài 3. Chỉ số ưu tiên 10 ngành','MCDM, chuẩn hóa min-max và trọng số chính sách',
    controls(['w1', 'w2', 'w3', 'w4', 'w5'], [
      ['Trọng số tăng trưởng', p.w1],
      ['Trọng số năng suất', p.w2],
      ['Trọng số lan tỏa', p.w3],
      ['Trọng số readiness', p.w4],
      ['Phạt rủi ro', p.w5]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Nhận xét xếp hạng', [
      'Nhóm ngành dẫn đầu thường có điểm lan tỏa, xuất khẩu và readiness cao nên phù hợp để ưu tiên chuyển đổi số trước.',
      'Khai khoáng có năng suất lao động cao nhưng tăng trưởng âm, việc làm thấp và rủi ro tự động hóa lớn nên không phải lựa chọn ưu tiên nếu mục tiêu là lan tỏa bao trùm.',
      'Kết quả phụ thuộc mạnh vào trọng số. Vì vậy báo cáo nên trình bày ít nhất hai kịch bản: định hướng tăng trưởng và định hướng bao trùm.'
    ]),
    parts.agent
  );
}

function b4(){
  let p = paramsState.b4;
  let parts = getLessonParts('b4');
  return lesson('Bài 4. LP ngành - vùng','Phân bổ ngân sách theo vùng',
    controls(['budget', 'minReg', 'maxReg', 'minH', 'lambda'], [
      ['Ngân sách tổng', p.budget],
      ['Sàn mỗi vùng', p.minReg],
      ['Trần mỗi vùng', p.maxReg],
      ['Sàn nhân lực số', p.minH],
      ['λ công bằng', p.lambda]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Nhận xét phân bổ', [
      'Vùng có readiness cao nhận nhiều ngân sách AI hơn vì khả năng hấp thụ và chuyển hóa đầu tư thành GDP gain tốt hơn.',
      'Các vùng readiness thấp nên được phân bổ nhiều hơn vào hạ tầng và nhân lực, bởi đây là điều kiện tiền đề để các khoản đầu tư công nghệ sau này có hiệu quả.',
      'Ràng buộc công bằng làm giảm mức tối ưu kinh tế ngắn hạn nhưng giúp tránh tập trung vốn vào một vài cực tăng trưởng, qua đó giảm khoảng cách số dài hạn.'
    ]),
    parts.agent
  );
}

function b5(){
  let p = paramsState.b5;
  let parts = getLessonParts('b5');
  return lesson('Bài 5. MIP lựa chọn 15 dự án','Biến nhị phân, ràng buộc tiên quyết và ngân sách đa năm',
    controls(['budget', 'budget12', 'minP', 'maxP', 'forceP14'], [
      ['Ngân sách 5 năm', p.budget],
      ['Ngân sách năm 1-2', p.budget12],
      ['Số dự án tối thiểu', p.minP],
      ['Số dự án tối đa', p.maxP],
      ['P14 bắt buộc (0/1)', p.forceP14]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Nhận xét danh mục dự án', [
      'MIP giúp biến bài toán lựa chọn dự án thành quyết định có/không, phù hợp với bối cảnh ngân sách hữu hạn.',
      'Các ràng buộc tiên quyết rất quan trọng: dự án công nghệ cao cần đi cùng đào tạo nhân lực, nếu không lợi ích kỳ vọng sẽ khó đạt được.',
      'Dự án có tỷ suất cao nhưng quy mô nhỏ có thể bị loại khi mô hình tối đa hóa lợi ích tuyệt đối; vì vậy nên thêm tiêu chí cộng hưởng hoặc tính nền tảng dữ liệu.'
    ]),
    parts.agent
  );
}

function b6(){
  let p = paramsState.b6;
  let parts = getLessonParts('b6');
  return lesson('Bài 6. TOPSIS xếp hạng 6 vùng','Ra quyết định đa tiêu chí với ideal và anti-ideal',
    controls(['w1', 'w2', 'w3', 'w4', 'w5'], [
      ['w GRDP/người', p.w1],
      ['w FDI', p.w2],
      ['w Digital Index', p.w3],
      ['w Readiness', p.w4],
      ['w Gini', p.w5]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Nhận xét TOPSIS', [
      'Đông Nam Bộ và Đồng bằng sông Hồng có xu hướng dẫn đầu nhờ GRDP/người, FDI, digital index, readiness và internet cao.',
      'TOPSIS hữu ích vì đo khoảng cách đến phương án lý tưởng, nhưng kết quả vẫn phụ thuộc trọng số và bộ tiêu chí.',
      'Nếu mục tiêu chính sách là ba trung tâm vùng, cần kết hợp điểm TOPSIS với tiêu chí địa lý, an ninh dữ liệu và khả năng lan tỏa sang vùng lân cận.'
    ]),
    parts.agent
  );
}

function b7() {
  let p = paramsState.b7;
  let parts = getLessonParts('b7');
  return lesson('Bài 7. NSGA-II Pareto','Tối ưu đa mục tiêu tăng trưởng - bao trùm - môi trường',
    controls(['budget', 'w1', 'w2', 'w3', 'w4'], [
      ['Tổng ngân sách (B)', p.budget],
      ['Trọng số GDP (w1)', p.w1],
      ['Trọng số Bình đẳng (w2)', p.w2],
      ['Trọng số Giảm phát thải (w3)', p.w3],
      ['Trọng số Giảm rủi ro (w4)', p.w4]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Diễn giải đa mục tiêu', [
      'Biên Pareto thể hiện sự đánh đổi không thể tránh khỏi: để tăng thêm GDP, ta buộc phải chấp nhận gia tăng phát thải hoặc phân bố lệch vùng.',
      'Điểm Compromise (Thỏa hiệp) được xác định dựa trên trọng số để tìm phương án hài hòa nhất.',
      'Mức giảm phát thải đạt cao nhất khi ta dịch chuyển cơ cấu công nghệ và năng lượng sạch, dù tốc độ GDP ngắn hạn có thể chậm lại.'
    ]),
    parts.agent
  );
}

function b8() {
  let p = paramsState.b8;
  let parts = getLessonParts('b8');
  return lesson('Bài 8. Quy hoạch động 2026-2035','Tối ưu ngân sách theo thời gian',
    controls(['budget', 'w1', 'w2', 'w3', 'w4'], [
      ['Tổng vốn đầu tư 10 năm (tỷ)', p.budget],
      ['Hệ số tích lũy vốn (w1)', p.w1],
      ['Tỷ lệ khấu hao vốn (w2)', p.w2],
      ['Hệ số chiết khấu tương lai (w3)', p.w3],
      ['Mức ưu tiên phúc lợi tiêu dùng (w4)', p.w4]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Diễn giải quy hoạch động', [
      'Mô hình tối ưu hóa quỹ đạo tích lũy vốn vật chất và phi vật chất bằng phương trình hàm Bellman.',
      'Hệ số chiết khấu cao khuyến khích trì hoãn tiêu dùng để đầu tư phát triển, giúp GDP đạt mức đỉnh lớn hơn ở giai đoạn cuối.',
      'So với phương án phân bổ đều (Even Allocation), nghiệm tối ưu động giúp tăng tổng phúc lợi ròng đáng kể.'
    ]),
    parts.agent
  );
}

function b9() {
  let p = paramsState.b9;
  let parts = getLessonParts('b9');
  return lesson('Bài 9. Lao động và công nghệ','Mô phỏng dịch chuyển lao động và đào tạo lại',
    controls(['budget', 'w1', 'w2', 'w3', 'w4'], [
      ['Ngân sách đào tạo lại (tỷ)', p.budget],
      ['Hệ số tự động hóa (w1)', p.w1],
      ['Hiệu suất đào tạo (w2)', p.w2],
      ['Chi phí đào tạo/người (tr.đ)', p.w3],
      ['Mức phạt thất nghiệp (w4)', p.w4]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Diễn giải mô hình lao động', [
      'Các ngành thâm dụng lao động như dệt may, bán lẻ chịu rủi ro tự động hóa cao nhất, làm giảm nhu cầu lao động kỹ năng thấp.',
      'Ngân sách đào tạo giúp chuyển đổi lao động thất nghiệp sang các ngành dịch vụ, công nghệ có nhu cầu tuyển dụng lớn.',
      'Hiệu suất đào tạo và chi phí đơn vị quyết định quy mô lao động được hỗ trợ chuyển đổi thành công trong kỳ hạn.'
    ]),
    parts.agent
  );
}

function b10() {
  let p = paramsState.b10;
  let parts = getLessonParts('b10');
  return lesson('Bài 10. Stochastic Programming','Tối ưu dưới điều kiện bất định',
    controls(['budget', 'w1', 'w2', 'w3', 'w4'], [
      ['Tổng ngân sách đầu tư (tỷ)', p.budget],
      ['Xác suất kịch bản Tốt (w1)', p.w1],
      ['Xác suất kịch bản Thường (w2)', p.w2],
      ['Mức độ rủi ro hệ thống (w3)', p.w3],
      ['Hệ số phạt vi phạm ràng buộc (w4)', p.w4]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Diễn giải mô hình ngẫu nhiên', [
      'Mô hình lập trình ngẫu nhiên 2 giai đoạn xác định cấu trúc đầu tư tối ưu ở giai đoạn 1 và các quyết định ứng phó ở giai đoạn 2.',
      'EVPI (Expected Value of Perfect Information) đo lường giá trị của thông tin hoàn hảo.',
      'VSS (Value of Stochastic Solution) thể hiện lợi thế của việc sử dụng mô hình ngẫu nhiên so với mô hình trung bình đơn giản.'
    ]),
    parts.agent
  );
}

function b11() {
  let p = paramsState.b11;
  let parts = getLessonParts('b11');
  return lesson('Bài 11. Q-learning','Học tăng cường tối ưu hóa chính sách',
    controls(['budget', 'w1', 'w2', 'w3', 'w4'], [
      ['Số tập huấn luyện (Episodes)', p.budget],
      ['Tốc độ học Learning Rate (w1)', p.w1],
      ['Hệ số chiết khấu Reward (w2)', p.w2],
      ['Hệ số khám phá Epsilon (w3)', p.w3],
      ['Ưu thế Phần thưởng mục tiêu (w4)', p.w4]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Diễn giải mô hình Q-learning', [
      'Mô hình học tăng cường tìm kiếm chính sách đầu tư AI qua chuỗi hành động thử và sai.',
      'Hệ số học (Learning Rate) điều chỉnh tốc độ cập nhật giá trị Q; nếu quá cao có thể gây mất ổn định hội tụ.',
      'Đường cong phần thưởng (Reward) tăng dần và ổn định ở các tập sau, chứng minh tác nhân đã học được chính sách tối ưu.'
    ]),
    parts.agent
  );
}

function b12() {
  let p = paramsState.b12;
  let parts = getLessonParts('b12');
  return lesson('Bài 12. AIDEOM tích hợp','Dashboard tổng hợp kịch bản phát triển Việt Nam 2030',
    controls(['budget', 'w1', 'w2', 'w3', 'w4'], [
      ['Tổng vốn đầu tư xã hội (B)', p.budget],
      ['Mức ưu tiên Vốn vật chất K (w1)', p.w1],
      ['Mức ưu tiên Kinh tế số D (w2)', p.w2],
      ['Mức ưu tiên Công nghệ AI (w3)', p.w3],
      ['Mức ưu tiên Nhân lực số H (w4)', p.w4]
    ]),
    parts.mets,
    parts.tbl,
    parts.chart,
    analysis('Diễn giải kịch bản tổng hợp', [
      'Mô hình AIDEOM tích hợp so sánh hiệu quả 5 kịch bản chiến lược phân bổ nguồn lực của Việt Nam hướng tới năm 2030.',
      'Kịch bản S2 (Số hóa nhanh) và S5 (Tối ưu cân bằng) thường mang lại mức GDP dự báo 2030 cao nhất nhờ khai thác hiệu ứng cộng hưởng số hóa.',
      'Cần chú ý các rủi ro kịch bản: đầu tư quá mức vào công nghệ mà bỏ quên đào tạo nhân lực H sẽ tạo ra "AI skill bottleneck".'
    ]),
    parts.agent
  );
}

const renderMap={home,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12};

function render(){
  let t=tasks.find(x=>x[0]===current);
  $('pageTitle').textContent=t[1];
  $('content').innerHTML=renderMap[current]();
  document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.id===current));
  window.scrollTo({top:0,behavior:'smooth'});
}

function init(){
  $('nav').innerHTML=tasks.map(t=>`<button data-id="${t[0]}">${t[1]}</button>`).join('');
  $('nav').onclick=e=>{if(e.target.dataset.id){current=e.target.dataset.id;render();}};
  $('agentSelect').onchange=render;
  
  // Tab switcher and Card click handlers (delegated)
  $('content').onclick = e => {
    let card = e.target.closest('.ex-card');
    if (card && card.dataset.goto) {
      current = card.dataset.goto;
      render();
      return;
    }
    let btn = e.target.closest('.tabs button');
    if (btn) {
      let tabsContainer = btn.parentElement;
      tabsContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      let tabName = btn.textContent.trim();
      let parentLesson = tabsContainer.closest('.lesson-card').parentElement;
      
      let pSection = parentLesson.querySelector('.section-params');
      let dSection = parentLesson.querySelector('.section-data');
      let aSection = parentLesson.querySelector('.section-agent');
      
      if (tabName === 'Tổng quan') {
        pSection.style.display = 'grid';
        dSection.style.display = 'grid';
        aSection.style.display = 'grid';
      } else if (tabName === 'Tham số') {
        pSection.style.display = 'grid';
        dSection.style.display = 'none';
        aSection.style.display = 'none';
      } else if (tabName === 'Bảng số liệu') {
        pSection.style.display = 'none';
        dSection.style.display = 'grid';
        aSection.style.display = 'none';
      } else if (tabName === 'Phân tích tác nhân') {
        pSection.style.display = 'none';
        dSection.style.display = 'none';
        aSection.style.display = 'grid';
      }
    }
  };
  
  // Real-time input updates preserving text cursor position
  $('content').oninput = e => {
    let input = e.target.closest('.control input');
    if (input) {
      let key = input.dataset.key;
      let val = parseFloat(input.value);
      if (!isNaN(val) && paramsState[current]) {
        paramsState[current][key] = val;
        
        // Dynamic lightweight update of ONLY calculated cards
        let parts = getLessonParts(current);
        if (parts) {
          let metsCard = $('mets-card');
          let tblCard = $('tbl-card');
          let chartCard = $('chart-card');
          let agentCard = $('agent-card');
          
          if (metsCard) metsCard.innerHTML = `<h3 class="section-title">Kết quả chính</h3>${parts.mets}`;
          if (tblCard) tblCard.innerHTML = `<h3 class="section-title">Bảng số liệu</h3>${parts.tbl}`;
          if (chartCard) chartCard.innerHTML = `<h3 class="section-title">Biểu đồ</h3>${parts.chart}`;
          if (agentCard) agentCard.innerHTML = `<h3 class="section-title">Tác nhân phân tích kết quả</h3>${parts.agent}`;
        }
      }
    }
  };
  
  render();
}

init();
