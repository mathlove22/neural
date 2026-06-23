import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Settings, Zap, TrendingDown, ArrowRight, Activity, AlertTriangle, RotateCcw, Calculator, ChevronRight, Search, Mountain, Move, Box, CheckCircle2 } from 'lucide-react';

// --- Beautiful Math Components ---
const MathEq = ({ children }) => (
  <span className="font-serif italic text-blue-200 tracking-wide select-none mx-1 font-medium text-[1.05em]" style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}>
    {children}
  </span>
);
const Sub = ({ children }) => <sub className="text-[0.65em] bottom-[-0.25em] relative ml-[1px]">{children}</sub>;
const Sup = ({ children }) => <sup className="text-[0.65em] top-[-0.4em] relative ml-[1px]">{children}</sup>;

const App = () => {
  const [activeTab, setActiveTab] = useState('gradient'); // Defaulting to the requested tab for easy testing

  const [inputNodes, setInputNodes] = useState(784); 
  const [hiddenLayers, setHiddenLayers] = useState([128, 64]);
  const [outputNodes, setOutputNodes] = useState(10);
  
  const [totalParams, setTotalParams] = useState(0);
  const [paramDetails, setParamDetails] = useState([]);

  useEffect(() => {
    let params = 0;
    let details = [];
    let prevNodes = inputNodes;
    
    hiddenLayers.forEach((nodes, idx) => {
      const layerParams = (prevNodes * nodes) + nodes; 
      params += layerParams;
      details.push({
        name: `은닉층 ${idx + 1}`,
        prev: prevNodes,
        curr: nodes,
        params: layerParams
      });
      prevNodes = nodes;
    });
    
    const outParams = (prevNodes * outputNodes) + outputNodes;
    params += outParams;
    details.push({
      name: `출력층`,
      prev: prevNodes,
      curr: outputNodes,
      params: outParams
    });

    setTotalParams(params);
    setParamDetails(details);
  }, [inputNodes, hiddenLayers, outputNodes]);

  const tabs = [
    { id: 'parameters', label: '차원의 폭발', icon: <Settings size={18} /> },
    { id: 'nightmare', label: '수학적 절망', icon: <AlertTriangle size={18} /> },
    { id: 'backprop', label: '역전파의 기적', icon: <Zap size={18} /> },
    { id: 'gradient', label: '경사하강법', icon: <TrendingDown size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#090b14] text-slate-200 font-sans selection:bg-blue-500/40 flex flex-col antialiased">
      <header className="bg-slate-900/60 backdrop-blur-xl border-b border-white/5 p-6 shadow-2xl relative z-20 shrink-0 sticky top-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 tracking-tight">
                인공지능 수학의 비밀
              </h1>
              <p className="text-slate-400 mt-1 text-sm font-medium tracking-wide">왜 연립방정식이 아닌 역전파와 경사하강법인가?</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 shadow-inner">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span className="text-sm font-medium text-slate-300">GPU 가속 시뮬레이션 활성화됨</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-8 px-4 pb-12 flex flex-col lg:flex-row gap-8 relative z-10 flex-1 w-full">
        {/* Sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="flex flex-col gap-3">
            {tabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-900/30 ring-1 ring-white/20 transform scale-[1.02]'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-white/5'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-white/5'}`}>
                  {tab.icon}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">Phase 0{idx+1}</span>
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
            <h3 className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
              <Calculator size={14} className="text-emerald-400" />
              현재 모델 차원(변수)
            </h3>
            <p className="text-4xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 tracking-tighter drop-shadow-sm">
              {totalParams.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#0f1222] rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative flex flex-col min-h-[700px] ring-1 ring-black/50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
          {activeTab === 'parameters' && (
            <ParametersTab 
              inputNodes={inputNodes} setInputNodes={setInputNodes}
              hiddenLayers={hiddenLayers} setHiddenLayers={setHiddenLayers}
              outputNodes={outputNodes} setOutputNodes={setOutputNodes}
              totalParams={totalParams}
              paramDetails={paramDetails}
            />
          )}
          {activeTab === 'nightmare' && <NightmareTab totalParams={totalParams} />}
          {activeTab === 'backprop' && <BackpropTab />}
          {activeTab === 'gradient' && <GradientDescentTab />}
        </div>
      </main>
    </div>
  );
};

// --- Tab 1: Parameters Builder ---
const ParametersTab = ({ inputNodes, setInputNodes, hiddenLayers, setHiddenLayers, outputNodes, setOutputNodes, totalParams, paramDetails }) => {
  return (
    <div className="p-10 animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col overflow-y-auto">
      <h2 className="text-3xl font-black text-white mb-8 tracking-tight drop-shadow-sm">차원의 폭발 <span className="text-slate-500 font-normal text-2xl">| 교과서 vs 인공지능</span></h2>
      
      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
        <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-3">
          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-md text-sm font-black tracking-widest uppercase">Story 01</span> 
          미지수의 개수가 스케일을 결정한다
        </h3>
        <p className="text-slate-300 text-lg leading-relaxed mb-5">
          우리가 교과서에서 최솟값을 찾는 문제는 일차함수 <MathEq>y = ax + b</MathEq> 나 이차함수 <MathEq>y = ax<Sup>2</Sup> + bx + c</MathEq> 정도입니다. 찾아야 할 미지수는 <MathEq>a, b, c</MathEq> 등 고작 2~3개이며, 눈으로 뻔히 보이는 매끄러운 곡선입니다.
        </p>
        <p className="text-slate-300 text-lg leading-relaxed">
          하지만 인공지능은 수많은 입력을 처리하기 위해 <MathEq>y = f(w<Sub>1</Sub>x<Sub>1</Sub> + &middot;&middot;&middot; + w<Sub>n</Sub>x<Sub>n</Sub> + b)</MathEq> 와 같은 거대한 다항식을 층층이 합성합니다. 이로 인해 가중치(<MathEq>w</MathEq>)와 편향(<MathEq>b</MathEq>)은 기하급수적으로 폭발합니다.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center mb-10">
        <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-w-[140px] shadow-xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 w-full h-1 bg-blue-500 group-hover:h-2 transition-all"></div>
          <span className="text-sm text-slate-400 mb-4 font-bold uppercase tracking-wider">입력층 <MathEq>(X)</MathEq></span>
          <input type="number" value={inputNodes} onChange={(e) => setInputNodes(Number(e.target.value))} className="w-24 bg-white/10 text-center text-2xl text-white font-bold rounded-xl p-3 border border-white/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all shadow-inner" />
          <span className="text-xs text-slate-500 mt-4 text-center font-medium">MNIST 이미지<br/>28×28 = 784</span>
        </div>

        <div className="flex items-center justify-center text-slate-600">
          <ArrowRight size={24} className="hidden md:block" />
        </div>

        <div className="flex-1 bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center relative shadow-xl overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute top-0 w-full h-1 bg-emerald-500 group-hover:h-2 transition-all"></div>
          <span className="text-sm text-slate-400 mb-6 font-bold uppercase tracking-wider">은닉층 계층 <MathEq>(H<Sub>n</Sub>)</MathEq></span>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {hiddenLayers.map((nodes, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {idx > 0 && <ChevronRight size={18} className="text-slate-600" />}
                <input type="number" value={nodes} 
                  onChange={(e) => {
                    const newLayers = [...hiddenLayers];
                    newLayers[idx] = Number(e.target.value);
                    setHiddenLayers(newLayers);
                  }}
                  className="w-20 bg-emerald-900/20 text-center text-2xl text-emerald-400 font-black rounded-xl p-3 border border-emerald-500/30 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all shadow-inner" 
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setHiddenLayers([...hiddenLayers, hiddenLayers[hiddenLayers.length-1] || 64])} className="text-sm font-bold bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg text-slate-300 transition-colors">+ 레이어 추가</button>
            <button onClick={() => setHiddenLayers(hiddenLayers.slice(0, -1))} className="text-sm font-bold bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-lg text-red-400 disabled:opacity-30 transition-colors" disabled={hiddenLayers.length <= 1}>- 레이어 제거</button>
          </div>
        </div>

        <div className="flex items-center justify-center text-slate-600">
          <ArrowRight size={24} className="hidden md:block" />
        </div>

        <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-w-[140px] shadow-xl relative overflow-hidden group hover:border-amber-500/50 transition-colors">
          <div className="absolute top-0 w-full h-1 bg-amber-500 group-hover:h-2 transition-all"></div>
          <span className="text-sm text-slate-400 mb-4 font-bold uppercase tracking-wider">출력층 <MathEq>(Y)</MathEq></span>
          <input type="number" value={outputNodes} onChange={(e) => setOutputNodes(Number(e.target.value))} className="w-24 bg-white/10 text-center text-2xl text-white font-bold rounded-xl p-3 border border-white/20 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none transition-all shadow-inner" />
          <span className="text-xs text-slate-500 mt-4 text-center font-medium">정답 라벨 수<br/>(예: 0~9 = 10개)</span>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl shadow-inner mb-8">
        <h4 className="text-base font-bold text-slate-300 mb-4 flex items-center gap-2"><Calculator size={18} className="text-blue-400"/> 매개변수(차원) 연산 내역 분석</h4>
        <div className="text-sm text-slate-400 space-y-3 font-mono">
          {paramDetails.map((detail, idx) => (
            <div key={idx} className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
              <span className="font-semibold">{idx === 0 ? '입력층' : `은닉층 ${idx}`} <MathEq>&rarr;</MathEq> {detail.name}</span>
              <span className="text-slate-500">
                ({detail.prev} × {detail.curr}) + 편향 {detail.curr} = <strong className="text-emerald-400 text-base">{detail.params.toLocaleString()}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 p-8 rounded-2xl shadow-2xl mt-auto shrink-0 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
        <h3 className="text-xl font-black text-white mb-3">결론: 우리는 <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">{totalParams.toLocaleString()}차원</span>의 짙은 안개 속에 서 있습니다.</h3>
        <p className="text-slate-300 text-base leading-relaxed">
          가중치 행렬 곱셈 연산으로 인해, 이 단순한 모델조차 <strong className="text-white bg-emerald-500/20 px-2 py-0.5 rounded">{totalParams.toLocaleString()}개</strong>의 변수를 가집니다. 수학적으로 우리는 <strong>방향도 보이지 않는 {totalParams.toLocaleString()}차원 공간</strong>에서 정답(최저점)을 향해 길을 찾아야만 합니다.
        </p>
      </div>
    </div>
  );
};

// --- Tab 2: The Nightmare ---
const NightmareTab = ({ totalParams }) => {
  const [calculating, setCalculating] = useState(false);
  const [progress, setProgress] = useState(0);

  const N = totalParams;
  const operations = Math.pow(N, 3);
  
  const startCalculation = () => {
    setCalculating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 0.0001;
      });
    }, 100);
  };

  return (
    <div className="p-10 animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col">
      <h2 className="text-3xl font-black text-red-400 mb-8 flex items-center gap-4 drop-shadow-[0_0_10px_rgba(248,113,113,0.3)]">
        <AlertTriangle size={32} /> 수학적 절망 <span className="text-slate-500 font-normal text-2xl">| 방정식 풀이의 붕괴</span>
      </h2>
      
      <div className="bg-red-950/30 p-8 rounded-2xl border border-red-500/30 mb-8 relative overflow-hidden shadow-inner shrink-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[100px] pointer-events-none"></div>
        <p className="text-xl text-white mb-5 font-bold italic tracking-wide">
          "미분해서 0이 되는 연립방정식으로 정답을 한 번에 찾으면 안 되나요?"
        </p>
        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          변수가 <strong className="text-white text-xl">{N.toLocaleString()}</strong>개인 다변수 함수의 극솟값을 연립방정식(헤시안 역행렬 연산)으로 정확히 풀려면, 행렬 연산의 특성상 무려 <MathEq>O(N<Sup>3</Sup>)</MathEq>에 달하는 천문학적 연산을 수행해야 합니다.
        </p>
        
        <div className="flex flex-col items-center gap-3 bg-black/50 p-8 rounded-2xl border border-red-500/20 shadow-xl relative z-10">
          <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">이미지 단 1장 학습에 필요한 수학적 방정식 연산 횟수</span>
          <span className="text-4xl lg:text-5xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400 font-black tracking-tighter drop-shadow-lg">
            {operations.toLocaleString()} 번
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-3xl p-8 bg-white/5 min-h-[300px] relative overflow-hidden">
        {!calculating ? (
          <button 
            onClick={startCalculation}
            className="group relative bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-10 py-5 rounded-full font-black text-xl shadow-[0_0_40px_rgba(225,29,72,0.4)] hover:shadow-[0_0_60px_rgba(225,29,72,0.6)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <Activity size={24} className="relative z-10" /> 
            <span className="relative z-10">연립방정식 풀기 (교과서 방식 시뮬레이션)</span>
          </button>
        ) : (
          <div className="w-full max-w-lg text-center animate-in zoom-in duration-500 bg-black/60 p-8 rounded-3xl border border-red-500/30 shadow-2xl backdrop-blur-md">
            <div className="mb-8">
              <Activity className="mx-auto text-red-500 animate-spin mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" size={64} />
              <p className="text-red-400 font-black text-2xl animate-pulse mb-2 tracking-tight">연산량 폭발! (O(N³) 한계 초과)</p>
              <p className="text-base text-slate-400">행렬식을 계산하기 위해 슈퍼컴퓨터로 수백 년이 필요합니다...</p>
            </div>
            <div className="w-full bg-black/80 rounded-full h-6 mb-4 overflow-hidden border border-white/10 shadow-inner relative">
              <div className="absolute inset-0 bg-red-500/20 animate-pulse"></div>
              <div className="bg-gradient-to-r from-red-600 to-rose-500 h-full rounded-full relative z-10" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-sm font-mono text-slate-400 mb-8 font-bold">{progress.toFixed(6)}% 완료</p>
            <button onClick={() => setCalculating(false)} className="text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-full text-white transition-all hover:scale-105 active:scale-95">
              연산 강제 종료
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Tab 3: Backprop Magic ---
const BackpropTab = () => {
  const [step, setStep] = useState(0);

  const forwardPass = () => setStep(1);
  const calcError = () => setStep(2);
  const backwardPass = () => setStep(3);
  const reset = () => setStep(0);

  const inputNodes = [{ id: 'i0', x: 80, y: 70 }, { id: 'i1', x: 80, y: 150 }, { id: 'i2', x: 80, y: 230 }];
  const hiddenNodes = [{ id: 'h0', x: 320, y: 40 }, { id: 'h1', x: 320, y: 113 }, { id: 'h2', x: 320, y: 186 }, { id: 'h3', x: 320, y: 260 }];
  const outputNodes = [{ id: 'o0', x: 560, y: 100 }, { id: 'o1', x: 560, y: 200 }];

  const edgesLayer1 = [];
  inputNodes.forEach(i => hiddenNodes.forEach(h => edgesLayer1.push({ src: i, tgt: h, id: `${i.id}-${h.id}` })));
  const edgesLayer2 = [];
  hiddenNodes.forEach(h => outputNodes.forEach(o => edgesLayer2.push({ src: h, tgt: o, id: `${h.id}-${o.id}` })));

  return (
    <div className="p-10 animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col overflow-y-auto">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash-flow { to { stroke-dashoffset: -30; } }
        @keyframes dash-flow-reverse { to { stroke-dashoffset: 30; } }
        .flow-fw { stroke-dasharray: 6 12; animation: dash-flow 0.6s linear infinite; }
        .flow-bw { stroke-dasharray: 6 12; animation: dash-flow-reverse 0.6s linear infinite; }
      `}} />

      <h2 className="text-3xl font-black text-emerald-400 mb-6 flex items-center gap-3 shrink-0 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">
        <Zap size={32} /> 역전파의 당위성 <span className="text-slate-500 font-normal text-2xl">| 방정식을 버리고 책임을 나누다</span>
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-6 mb-8 shrink-0">
        <div className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl shadow-xl flex flex-col justify-between backdrop-blur-sm group hover:border-red-500/40 transition-colors">
          <div>
            <h4 className="text-red-400 font-black mb-4 border-b border-red-500/20 pb-3 flex items-center gap-2 text-lg">❌ 통째로 전개 후 미분 (불가능)</h4>
            <p className="text-sm text-slate-300 mb-3 leading-relaxed">거대한 신경망 식 전체를 특정 가중치 하나로 통째로 미분하려 하면 연쇄 폭발이 일어납니다.</p>
          </div>
          <div className="text-red-300 font-mono text-sm overflow-hidden break-words bg-black/60 p-4 rounded-xl leading-relaxed border border-red-500/20 mt-4 shadow-inner">
            &part;L / &part;w<Sub>1</Sub> = &part;/&part;w<Sub>1</Sub> [ f(w<Sub>3</Sub> &middot; f(w<Sub>2</Sub> &middot; f(w<Sub>1</Sub>x + b<Sub>1</Sub>) + b<Sub>2</Sub>)) ]<br/>
            = f'(...)*w<Sub>3</Sub> * f'(...)*w<Sub>2</Sub> * f'(...)*x <br/>
            <span className="text-red-400/80 italic mt-3 block font-bold">&rarr; 항이 기하급수적으로 늘어나 메모리가 폭발합니다.</span>
          </div>
        </div>
        
        <div className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl shadow-xl flex flex-col justify-between backdrop-blur-sm group hover:border-emerald-500/40 transition-colors">
          <div>
            <h4 className="text-emerald-400 font-black mb-4 border-b border-emerald-500/20 pb-3 flex items-center gap-2 text-lg">✅ 역전파 체인룰 (직관적 분배)</h4>
            <p className="text-sm text-slate-300 mb-3 leading-relaxed">방정식을 버립니다. 뒤에서 <strong className="text-emerald-300 font-black px-1 bg-emerald-500/20 rounded">전달받은 오차(책임)</strong>에 <strong className="text-blue-300 font-black px-1 bg-blue-500/20 rounded">자신의 기여도(영향력)</strong>를 곱해 수정합니다.</p>
          </div>
          <div className="text-emerald-300 font-mono text-sm overflow-hidden break-words bg-black/60 p-4 rounded-xl leading-relaxed border border-emerald-500/20 mt-4 shadow-inner">
            &part;L / &part;w<Sub>1</Sub> = ( <span className="text-emerald-400 font-bold">전달받은 오차</span> ) &times; ( <span className="text-blue-400 font-bold">현재 선의 기여도</span> )<br/>
            <br/>
            <span className="text-emerald-400/80 italic mt-2 block font-bold">&rarr; 복잡한 방정식이 "단순 실수들의 연속 곱셈"으로 바뀝니다!</span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-black/40 rounded-3xl border border-white/10 relative flex flex-col p-8 shadow-2xl min-h-[500px]">
        <div className="flex-1 w-full flex items-center justify-center">
          <svg viewBox="0 0 700 320" className="w-full max-w-4xl h-auto overflow-visible">
            {edgesLayer1.map(edge => <line key={edge.id} x1={edge.src.x} y1={edge.src.y} x2={edge.tgt.x} y2={edge.tgt.y} stroke="#334155" strokeWidth="2" opacity="0.5" />)}
            {edgesLayer2.map(edge => <line key={edge.id} x1={edge.src.x} y1={edge.src.y} x2={edge.tgt.x} y2={edge.tgt.y} stroke="#334155" strokeWidth="2" opacity="0.5" />)}

            <g className={`transition-opacity duration-700 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
              {edgesLayer1.map(e => <line key={`fw1-${e.id}`} x1={e.src.x} y1={e.src.y} x2={e.tgt.x} y2={e.tgt.y} stroke="#3b82f6" strokeWidth="3" className="flow-fw" opacity="0.6" />)}
              {edgesLayer2.map(e => <line key={`fw2-${e.id}`} x1={e.src.x} y1={e.src.y} x2={e.tgt.x} y2={e.tgt.y} stroke="#3b82f6" strokeWidth="3" className="flow-fw" opacity="0.6" />)}
            </g>

            <g className={`transition-opacity duration-700 ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
              {edgesLayer2.map(e => <line key={`bw2-${e.id}`} x1={e.src.x} y1={e.src.y} x2={e.tgt.x} y2={e.tgt.y} stroke="#10b981" strokeWidth="3" className="flow-bw" opacity="0.4" />)}
              {edgesLayer1.map(e => <line key={`bw1-${e.id}`} x1={e.src.x} y1={e.src.y} x2={e.tgt.x} y2={e.tgt.y} stroke="#10b981" strokeWidth="3" className="flow-bw" opacity="0.4" />)}
            </g>

            <g className={`transition-all duration-1000 ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
              <line x1={hiddenNodes[1].x} y1={hiddenNodes[1].y} x2={outputNodes[0].x} y2={outputNodes[0].y} stroke="#34d399" strokeWidth="6" className="flow-bw drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <line x1={inputNodes[1].x} y1={inputNodes[1].y} x2={hiddenNodes[1].x} y2={hiddenNodes[1].y} stroke="#fbbf24" strokeWidth="8" className="flow-bw drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              
              <rect x="375" y="55" width="140" height="30" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
              <text x="445" y="75" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontFamily="monospace" fontWeight="bold">뒤에서 넘어온 오차</text>

              <rect x="100" y="160" width="210" height="55" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
              <text x="205" y="180" textAnchor="middle" fill="#fcd34d" fontSize="12" fontWeight="bold">특정 선(가중치) 수정 방향 결정</text>
              <text x="205" y="202" textAnchor="middle" fill="#fef3c7" fontSize="11" fontFamily="monospace">넘어온 오차 &times; 자신의 기여도</text>
            </g>

            {inputNodes.map(n => <g key={n.id}><circle cx={n.x} cy={n.y} r="20" fill="#0f172a" stroke="#475569" strokeWidth="4" className={`transition-colors duration-500 ${step >= 1 ? 'stroke-blue-500 shadow-[0_0_15px_blue]' : ''}`} /></g>)}
            {hiddenNodes.map(n => <g key={n.id}><circle cx={n.x} cy={n.y} r="20" fill="#0f172a" stroke="#475569" strokeWidth="4" className={`transition-colors duration-500 ${step >= 1 ? 'stroke-blue-500' : ''} ${step === 3 && n.id === 'h1' ? 'stroke-emerald-400 fill-emerald-900/80 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]' : ''}`} /></g>)}
            
            <g>
              <circle cx={outputNodes[0].x} cy={outputNodes[0].y} r="32" fill="#0f172a" stroke="#475569" strokeWidth="4" className={`transition-colors duration-500 ${step >= 1 ? 'stroke-blue-500' : ''} ${step >= 2 ? 'stroke-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}`} />
              <text x={outputNodes[0].x} y={outputNodes[0].y - 5} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">정답: 1.0</text>
              <text x={outputNodes[0].x} y={outputNodes[0].y + 14} textAnchor="middle" fill="#94a3b8" fontSize="12">예측: 0.2</text>
              <g className={`transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <rect x={outputNodes[0].x + 40} y={outputNodes[0].y - 18} width="125" height="36" rx="10" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2"/>
                  <text x={outputNodes[0].x + 102} y={outputNodes[0].y + 5} textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="bold">오차: +0.8 (부족)</text>
              </g>
            </g>

            <g>
              <circle cx={outputNodes[1].x} cy={outputNodes[1].y} r="32" fill="#0f172a" stroke="#475569" strokeWidth="4" className={`transition-colors duration-500 ${step >= 1 ? 'stroke-blue-500' : ''} ${step >= 2 ? 'stroke-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}`} />
              <text x={outputNodes[1].x} y={outputNodes[1].y - 5} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">정답: 0.0</text>
              <text x={outputNodes[1].x} y={outputNodes[1].y + 14} textAnchor="middle" fill="#94a3b8" fontSize="12">예측: 0.7</text>
              <g className={`transition-opacity duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <rect x={outputNodes[1].x + 40} y={outputNodes[1].y - 18} width="125" height="36" rx="10" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2"/>
                  <text x={outputNodes[1].x + 102} y={outputNodes[1].y + 5} textAnchor="middle" fill="#fca5a5" fontSize="13" fontWeight="bold">오차: -0.7 (초과)</text>
              </g>
            </g>

            <text x="80" y="10" textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold" letterSpacing="2">입력층 (X)</text>
            <text x="320" y="10" textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold" letterSpacing="2">은닉층 (H)</text>
            <text x="560" y="10" textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold" letterSpacing="2">출력층 (Y)</text>
          </svg>
        </div>

        <div className={`mt-6 w-full bg-gradient-to-r from-amber-900/30 to-amber-800/30 border border-amber-500/40 p-6 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-700 flex flex-col gap-4 ${step === 3 ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden py-0 border-transparent'}`}>
           <h4 className="text-amber-400 font-black flex items-center gap-3 text-lg"><Search size={20}/> 오차 책임의 분배 (역전파)</h4>
           <p className="text-base text-slate-200 leading-relaxed">
             위 노란색으로 강조된 단 하나의 선(가중치)을 보세요. 이 선은 앞 단계 노드들이 넘겨준 <strong>'오차 값(너 때문에 이만큼 틀렸어!)'</strong>에, 자신이 결과에 미친 <strong>'기여도'</strong>를 곱해서 스스로를 고칠 방향을 정합니다.
           </p>
           <div className="bg-black/40 border border-emerald-500/30 p-5 rounded-xl mt-2 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
             <p className="text-base text-emerald-400 font-black mb-2">💡 심화 질문: "그럼 실제 컴퓨터는 이 연산을 선마다 1개씩 따로 하나요?"</p>
             <p className="text-sm text-emerald-100/80 leading-relaxed">
               아닙니다! 이해를 돕기 위해 선 하나를 돋보기로 확대한 것일 뿐, <strong>실제 인공지능은 수만~수십억 개의 선을 거대한 하나의 '행렬(Matrix)'이자 '벡터'로 묶어버립니다.</strong> 그리고 CPU 대신 그래픽 카드(GPU)를 이용해 0.001초 만에 <strong>모든 선의 업데이트 방향을 한 번에(동시에) 계산</strong>합니다. 이것이 바로 인공지능에 GPU가 필수적인 이유입니다!
             </p>
           </div>
        </div>

        <div className="mt-8 flex gap-4 w-full justify-center flex-wrap shrink-0">
          <button onClick={forwardPass} disabled={step > 0} className={`flex-1 min-w-[160px] max-w-[200px] flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black transition-all duration-300 ${step === 0 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] scale-105' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
            1. 순전파 (예측) <ArrowRight size={18} />
          </button>
          <button onClick={calcError} disabled={step !== 1} className={`flex-1 min-w-[160px] max-w-[200px] flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black transition-all duration-300 ${step === 1 ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] scale-105' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
            2. 오차 확인
          </button>
          <button onClick={backwardPass} disabled={step !== 2} className={`flex-1 min-w-[200px] max-w-[240px] flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black transition-all duration-300 ${step === 2 ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] scale-105' : 'bg-white/5 text-slate-500 border border-white/10'}`}>
            <RotateCcw size={18} className="rotate-180" /> 3. 역전파 (오차 분배)
          </button>
          <button onClick={reset} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all border border-white/10">
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Tab 4: Gradient Descent (Advanced 2D & 3D Visualizer) ---
const GradientDescentTab = () => {
  const [landscape, setLandscape] = useState('3d_complex'); // 'simple' | 'complex' | '3d_complex'
  const [lrMode, setLrMode] = useState('optimal'); // 'optimal' | 'zigzag' | 'diverge'
  
  // 2D State
  const [position, setPosition] = useState(30); 
  const [history, setHistory] = useState([30]);
  
  // 3D State
  const [pos3D, setPos3D] = useState({ x: 30, z: 30 });
  const [history3D, setHistory3D] = useState([{ x: 30, z: 30 }]);
  const [rot, setRot] = useState({ x: 0.6, y: 0.5 });
  const [zoom3D, setZoom3D] = useState(1.0);
  const [pan3D, setPan3D] = useState({ x: 0, y: 0 }); // SVG-space translation

  // 2D zoom/pan
  const [zoom2D, setZoom2D] = useState(1.0);
  const [pan2D, setPan2D] = useState({ x: 0, y: 0 });

  const [exploded, setExploded] = useState(false);

  // Mouse interaction refs
  const dragMode = useRef(null);   // 'rotate' | 'pan3d' | 'pan2d'
  const lastMouse = useRef({ x: 0, y: 0 });

  // ── 3D handlers ──
  const handleMouseDown3D = (e) => {
    e.preventDefault();
    if (e.button === 2) dragMode.current = 'pan3d';   // right-click = pan
    else                dragMode.current = 'rotate';   // left-click  = rotate
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseMove3D = (e) => {
    if (!dragMode.current) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    if (dragMode.current === 'rotate') {
      setRot(r => ({
        x: Math.max(-Math.PI / 2, Math.min(Math.PI / 2, r.x + dy * 0.01)),
        y: r.y + dx * 0.01,
      }));
    } else if (dragMode.current === 'pan3d') {
      setPan3D(p => ({ x: p.x + dx, y: p.y + dy }));
    }
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp3D = () => { dragMode.current = null; };
  const handleWheel3D = (e) => {
    e.preventDefault();
    setZoom3D(z => Math.max(0.3, Math.min(5.0, z * (e.deltaY < 0 ? 1.12 : 0.89))));
  };

  // ── 2D handlers ──
  const handleMouseDown2D = (e) => {
    if (e.button === 1 || e.button === 2) {
      e.preventDefault();
      dragMode.current = 'pan2d';
      lastMouse.current = { x: e.clientX, y: e.clientY };
    }
  };
  const handleMouseMove2D = (e) => {
    if (dragMode.current !== 'pan2d') return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    // Convert screen delta to SVG-viewBox delta
    setPan2D(p => ({ x: p.x - dx / zoom2D, y: p.y - dy / zoom2D }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };
  const handleMouseUp2D = () => { dragMode.current = null; };
  const handleWheel2D = (e) => {
    e.preventDefault();
    setZoom2D(z => Math.max(0.3, Math.min(8.0, z * (e.deltaY < 0 ? 1.12 : 0.89))));
  };

  // Learning Rates dictionary
  const lrs = {
    simple:     { optimal: 15,   zigzag: 160,  diverge: 205  },
    // complex start = 330 (right valley)
    // optimal lr=10  → monotone descent to local min ~309
    // zigzag  lr=120 → violent oscillation within the local min valley (trapped)
    // diverge lr=200 → explodes out of bounds
    complex:    { optimal: 10,   zigzag: 120,  diverge: 200  },
    // 3d start = (40,40), |grad| ≈ 3.0
    // optimal lr=1.5 → monotone descent
    // zigzag  lr=9.0 → loss oscillates ↑↓ each step
    // diverge lr=11  → loss grows, loss-based explosion at >200
    '3d_complex': { optimal: 1.5, zigzag: 9.0, diverge: 11.0 }
  };
  
  const reset = () => {
    // 2D: simple starts at left slope, complex starts at right slope (inside local min valley)
    const startX = landscape === 'simple' ? 30 : 330;
    setPosition(startX);
    setHistory([startX]);
    // 3D: start at (40,40) for stronger initial gradient
    setPos3D({ x: 40, z: 40 });
    setHistory3D([{ x: 40, z: 40 }]);
    setExploded(false);
  };

  // Reset on mode change
  useEffect(() => {
    reset();
  }, [landscape, lrMode]);

  const lr = lrs[landscape][lrMode];

  // 2D Math
  const getMathLoss = (x) => {
    if (landscape === 'simple') return 0.005 * Math.pow(x - 200, 2);
    const z = (x - 200) / 60;
    return 3 * (Math.pow(z, 4) - 7 * Math.pow(z, 2) + 2 * z) + 150;
  };

  const getGradient = (x) => {
    if (landscape === 'simple') return 0.01 * (x - 200);
    const z = (x - 200) / 60;
    return 3 * (4 * Math.pow(z, 3) - 14 * z + 2) / 60;
  };

  const getSVG_Y = (x) => 280 - getMathLoss(x);
  const curvePoints = Array.from({length: 401}, (_, i) => `${i},${getSVG_Y(i)}`).join(' ');

  // 3D Math - Complex non-convex landscape (with local minima and a global minimum at origin)
  // f(x,z) = (x^2 + z^2)/30 + 15 * sin(x/8) * cos(z/8)
  const getLoss3D = (x, z) => (x * x + z * z) / 30 + 15 * Math.sin(x / 8) * Math.cos(z / 8);
  
  const getGradient3D = (x, z) => {
    const dx = x / 15 + (15 / 8) * Math.cos(x / 8) * Math.cos(z / 8);
    const dz = z / 15 - (15 / 8) * Math.sin(x / 8) * Math.sin(z / 8);
    return { dx, dz };
  };
  
  // 3D to 2D SVG Projection  (with zoom + pan)
  const project3D = (x, y, z) => {
    const rx = rot.x;
    const ry = rot.y;
    let x1 = x * Math.cos(ry) - z * Math.sin(ry);
    let z1 = x * Math.sin(ry) + z * Math.cos(ry);
    let y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
    const scale = 2.5 * zoom3D;
    return { cx: 300 + pan3D.x + x1 * scale, cy: 210 + pan3D.y - y1 * scale };
  };

  // Pre-calculate 3D wireframe grid
  const gridPaths = useMemo(() => {
    let lines = [];
    for(let x = -50; x <= 50; x+=4) {
      let path = [];
      for(let z = -50; z <= 50; z+=4) {
        path.push({x, y: getLoss3D(x,z), z});
      }
      lines.push(path);
    }
    for(let z = -50; z <= 50; z+=4) {
      let path = [];
      for(let x = -50; x <= 50; x+=4) {
        path.push({x, y: getLoss3D(x,z), z});
      }
      lines.push(path);
    }
    return lines;
  }, []);

  const takeStep = () => {
    if (exploded) return;
    
    if (landscape === '3d_complex') {
      const { dx, dz } = getGradient3D(pos3D.x, pos3D.z);
      
      if (Math.abs(dx) < 0.05 && Math.abs(dz) < 0.05) return; // Converged
      
      let newX = pos3D.x - lr * dx;
      let newZ = pos3D.z - lr * dz;
      const newLoss = getLoss3D(newX, newZ);

      // Explosion: position out of bounds OR loss is clearly growing uncontrollably
      const prevLoss = getLoss3D(pos3D.x, pos3D.z);
      if (
        Math.abs(newX) > 100 || Math.abs(newZ) > 100 || isNaN(newX) ||
        (lrMode === 'diverge' && newLoss > prevLoss + 10 && history3D.length > 3)
      ) {
        setExploded(true);
        setHistory3D(h => [...h, { x: newX, z: newZ }]);
        return;
      }
      
      setPos3D({ x: newX, z: newZ });
      setHistory3D(h => [...h, { x: newX, z: newZ }]);
    } else {
      const grad = getGradient(position);
      // 'complex' has multiple local minima, allow convergence at any flat region
      if (Math.abs(grad) < 0.05 && landscape === 'simple') return;
      if (Math.abs(grad) < 0.01) return; // converged at any local min
      
      let newPos = position - lr * grad;
      
      if (newPos < -600 || newPos > 1000 || isNaN(newPos)) {
        setExploded(true);
        setHistory(h => [...h, newPos]);
        return;
      }
      const clampedPos = Math.max(0, Math.min(400, newPos));
      setPosition(clampedPos);
      setHistory(h => [...h, clampedPos]);
    }
  };

  // Generate the tangent plane at the current 3D position
  const getTangentPlanePoints = () => {
    if (landscape !== '3d_complex' || exploded) return null;
    const { x, z } = pos3D;
    const y = getLoss3D(x, z);
    const { dx, dz } = getGradient3D(x, z);
    
    const size = 12; // size of the plane
    const corners = [
      { cx: x - size, cz: z - size },
      { cx: x + size, cz: z - size },
      { cx: x + size, cz: z + size },
      { cx: x - size, cz: z + size },
    ];
    
    // Project the 4 corners of the tangent plane
    const projectedCorners = corners.map(c => {
      // Linear approximation: y = y0 + f_x * (x - x0) + f_z * (z - z0)
      const ty = y + dx * (c.cx - x) + dz * (c.cz - z);
      return project3D(c.cx, ty, c.cz);
    });
    
    return projectedCorners.map(p => `${p.cx},${p.cy}`).join(' ');
  };

  return (
    <div className="p-10 animate-in fade-in slide-in-from-bottom-8 duration-700 h-full flex flex-col">
      <h2 className="text-3xl font-black text-amber-400 mb-6 flex items-center gap-4 shrink-0 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
        <TrendingDown size={32} /> 경사하강법과 학습률 <span className="text-slate-500 font-normal text-2xl">| 정답을 향한 끝없는 하산</span>
      </h2>
      
      {/* Control Panel */}
      <div className="bg-black/40 border border-white/10 p-6 rounded-2xl shadow-xl mb-6 flex flex-col md:flex-row gap-8 shrink-0 backdrop-blur-md relative overflow-hidden z-20">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
        <div className="flex-1 z-10">
          <label className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-3 block flex items-center gap-2"><Mountain size={16}/> 1. 지형 (Cost Function) 선택</label>
          <div className="flex gap-3">
            <button onClick={() => setLandscape('simple')} className={`flex-1 py-3 px-4 text-sm rounded-xl font-bold transition-all duration-300 ${landscape === 'simple' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
               U자형 (2D)
            </button>
            <button onClick={() => setLandscape('complex')} className={`flex-1 py-3 px-4 text-sm rounded-xl font-bold transition-all duration-300 ${landscape === 'complex' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
               산맥 (2D)
            </button>
            <button onClick={() => setLandscape('3d_complex')} className={`flex-1 py-3 px-4 text-sm rounded-xl font-bold transition-all duration-300 ${landscape === '3d_complex' ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
               복잡한 다차원 (3D)
            </button>
          </div>
        </div>
        <div className="flex-1 z-10">
          <label className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-3 block flex items-center gap-2"><Move size={16}/> 2. 보폭 (학습률, &eta;) 조절</label>
          <div className="flex gap-3">
            <button onClick={() => setLrMode('optimal')} className={`flex-1 py-3 px-4 text-sm rounded-xl font-bold transition-all duration-300 ${lrMode === 'optimal' ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
               안정적 수렴
            </button>
            <button onClick={() => setLrMode('zigzag')} className={`flex-1 py-3 px-4 text-sm rounded-xl font-bold transition-all duration-300 ${lrMode === 'zigzag' ? 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
               오버슈팅
            </button>
            <button onClick={() => setLrMode('diverge')} className={`flex-1 py-3 px-4 text-sm rounded-xl font-bold transition-all duration-300 ${lrMode === 'diverge' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
               발산 (폭주)
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Storytelling */}
      <div className="bg-gradient-to-r from-indigo-900/20 to-transparent p-5 rounded-xl border-l-4 border-indigo-500 mb-6 text-base text-slate-300 shrink-0 shadow-inner">
        {landscape === 'simple' && lrMode === 'optimal' && "학습률이 적절하면 매 step마다 loss가 감소하며 안정적으로 Global Minimum을 향해 내려갑니다."}
        {landscape === 'simple' && lrMode === 'zigzag' && <span className="text-amber-400 font-bold">오버슈팅(Overshooting): 보폭이 너무 커서 최저점을 넘어 반대편 언덕으로 튕깁니다! 진동하면서도 결국 수렴하지만 매우 비효율적입니다.</span>}
        {landscape === 'simple' && lrMode === 'diverge' && <span className="text-red-400 font-bold">발산(Divergence): 보폭이 임계점을 넘으면 계곡을 점점 더 크게 뛰어넘으며 무한대로 날아갑니다. 모델이 완전히 붕괴되는 순간입니다!</span>}
        {landscape === 'complex' && lrMode === 'optimal' && <span className="text-purple-300 font-bold">Local Minimum의 함정: 계곡 안에서 시작해 가짜 최저점(Local Min)에 깔끔하게 수렴합니다. 정답(Global Min)을 찾지 못한 채 학습이 끝나버립니다.</span>}
        {landscape === 'complex' && lrMode === 'zigzag' && <span className="text-amber-400 font-bold">오버슈팅의 비효율성: 보폭이 커서 계곡 안에서 좌우로 요동칩니다! 계곡을 탈출하지도 못하고, 진동하느라 가짜 최저점에도 늦게 수렴합니다.</span>}
        {landscape === 'complex' && lrMode === 'diverge' && <span className="text-red-400 font-bold">발산(Divergence): 보폭이 너무 크면 단 몇 step 만에 함수 범위를 완전히 벗어나 폭주합니다. 복잡한 지형에서는 발산이 훨씬 빠릅니다!</span>}
        {landscape === '3d_complex' && lrMode === 'optimal' && <span className="text-indigo-300 font-bold">핵심 구조: <span className="text-pink-400 font-black">분홍색 화살표 n</span>은 <strong className="text-white">표면에서 수직으로 솟아오르는 법선벡터</strong>이고, <span className="text-red-400 font-black">빨간색 화살표 -∇L</span>은 <strong className="text-white">접평면 위에서 loss가 가장 빠르게 감소하는 경사하강 방향</strong>입니다. 두 벡터의 내적은 항상 0 → <span className="text-yellow-400">서로 정확히 90도 직교!</span></span>}
        {landscape === '3d_complex' && lrMode === 'zigzag' && <span className="text-amber-400 font-bold">다차원 오버슈팅: 보폭이 크면 한 계곡을 지나쳐 옆 계곡으로 튕깁니다. loss가 매 step마다 오르락내리락(↑↓)하며 수렴 효율이 매우 나빠집니다.</span>}
        {landscape === '3d_complex' && lrMode === 'diverge' && <span className="text-red-400 font-bold">발산 현상은 다차원 공간에서 더욱 치명적입니다. 매개변수 중 하나라도 폭주하면 전체 모델의 오차가 무한대가 됩니다!</span>}
      </div>

      {/* ── Graph Container ── */}
      <div className={`flex-1 rounded-3xl border flex flex-col shadow-2xl min-h-[460px] overflow-hidden transition-colors duration-500 ${exploded ? 'bg-red-950/50 border-red-500/50' : 'bg-[#0a0d18] border-white/10'}`}>

        {/* Status Bar */}
        <div className="w-full bg-white/5 border-b border-white/10 px-5 py-2.5 flex flex-wrap gap-4 items-center shrink-0 z-10">
          {landscape === '3d_complex' ? (
            <>
              <span className="text-xs text-slate-500 font-bold">좌표 (X,Z):</span>
              <span className="font-mono text-xs text-white bg-white/10 px-2 py-0.5 rounded">({pos3D.x.toFixed(1)}, {pos3D.z.toFixed(1)})</span>
              <span className="text-xs text-slate-500 font-bold">Loss:</span>
              <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{getLoss3D(pos3D.x, pos3D.z).toFixed(2)}</span>
              <span className="text-xs text-slate-500 font-bold">∇L:</span>
              <span className="font-mono text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded">({getGradient3D(pos3D.x, pos3D.z).dx.toFixed(2)}, {getGradient3D(pos3D.x, pos3D.z).dz.toFixed(2)})</span>
            </>
          ) : (
            <>
              <span className="text-xs text-slate-500 font-bold">가중치:</span>
              <span className="font-mono text-xs text-white bg-white/10 px-2 py-0.5 rounded">{position.toFixed(1)}</span>
              <span className="text-xs text-slate-500 font-bold">Loss:</span>
              <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">{getMathLoss(position).toFixed(2)}</span>
              <span className="text-xs text-slate-500 font-bold">기울기:</span>
              <span className="font-mono text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded">{getGradient(position).toFixed(3)}</span>
            </>
          )}
        </div>

        {/* EXPLOSION overlay */}
        {exploded && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-red-950/95 backdrop-blur-sm">
            <div className="text-center bg-black/60 p-10 rounded-3xl border border-red-500/30 shadow-[0_0_80px_rgba(220,38,38,0.5)]">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600 mb-4 animate-bounce">EXPLOSION!</h2>
              <p className="text-white text-xl font-bold bg-red-900/60 py-3 px-6 rounded-xl border border-red-500/50">오차가 무한대로 발산했습니다!</p>
              <button onClick={reset} className="mt-6 px-8 py-3 bg-white text-red-900 font-black rounded-full hover:bg-red-100 hover:scale-105 transition-all shadow-xl">초기화하여 다시 시작</button>
            </div>
          </div>
        )}

        {/* Canvas — strictly clipped */}
        <div className="flex-1 relative overflow-hidden">

          {landscape === '3d_complex' ? (
            /* ══ 3D VIEW ══ */
            <div
              className="absolute inset-0 select-none"
              style={{ cursor: dragMode.current === 'pan3d' ? 'grabbing' : dragMode.current === 'rotate' ? 'grabbing' : 'grab' }}
              onMouseDown={handleMouseDown3D}
              onMouseMove={handleMouseMove3D}
              onMouseUp={handleMouseUp3D}
              onMouseLeave={handleMouseUp3D}
              onWheel={handleWheel3D}
              onContextMenu={e => e.preventDefault()}
            >
              {/* Controls hint */}
              <div className="absolute top-2 right-2 z-10 pointer-events-none bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-2 flex flex-col gap-0.5 text-[9px] text-slate-500 font-bold">
                <span>🖱 왼쪽 드래그 → 회전</span>
                <span>🖱 오른쪽 드래그 → 이동</span>
                <span>🖱 휠 → 확대/축소</span>
              </div>

              {/* Vector legend */}
              <div className="absolute bottom-2 left-2 z-10 pointer-events-none bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex flex-col gap-1.5">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">벡터 범례</div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-pink-400">
                  <svg width="16" height="7" className="shrink-0"><line x1="0" y1="3.5" x2="11" y2="3.5" stroke="#f472b6" strokeWidth="2"/><polygon points="10,0.5 16,3.5 10,6.5" fill="#f472b6"/></svg>
                  <span><strong>n</strong> : 법선벡터 (표면에서 수직으로 솟음)</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-red-400">
                  <svg width="16" height="7" className="shrink-0"><line x1="0" y1="3.5" x2="11" y2="3.5" stroke="#ef4444" strokeWidth="2"/><polygon points="10,0.5 16,3.5 10,6.5" fill="#ef4444"/></svg>
                  <span><strong>-∇L</strong> : 경사하강 (접평면 위, loss 감소 방향)</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-400">
                  <span className="w-4 h-3 border border-indigo-400 inline-block rounded-sm opacity-70 shrink-0"/>
                  접평면 (Tangent Plane)
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-yellow-400">
                  <svg width="14" height="12" className="shrink-0"><polyline points="0,12 0,0 12,0" fill="none" stroke="#fbbf24" strokeWidth="1.5"/></svg>
                  n ⊥ -∇L (내적 = 0)
                </div>
              </div>

              <svg
                viewBox="0 0 600 420"
                className="w-full h-full pointer-events-none"
                style={{ display: 'block' }}
              >
                <defs>
                  <clipPath id="c3d"><rect x="0" y="0" width="600" height="420"/></clipPath>
                  <marker id="mn" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
                    <polygon points="0 0,5 2.5,0 5" fill="#f472b6"/>
                  </marker>
                  <marker id="md" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
                    <polygon points="0 0,5 2.5,0 5" fill="#ef4444"/>
                  </marker>
                </defs>

                <g clipPath="url(#c3d)">
                  {/* Wireframe */}
                  {gridPaths.map((path, i) => {
                    const d = path.map((p, j) => {
                      const pr = project3D(p.x, p.y, p.z);
                      return `${j === 0 ? 'M' : 'L'}${pr.cx.toFixed(1)},${pr.cy.toFixed(1)}`;
                    }).join(' ');
                    return <path key={i} d={d} fill="none" stroke="rgba(99,102,241,0.28)" strokeWidth="0.7"/>;
                  })}

                  {/* Global Min */}
                  {(() => {
                    const m = project3D(0, 0, 0);
                    return (
                      <g>
                        <circle cx={m.cx} cy={m.cy} r="4.5" fill="#10b981" opacity="0.9"/>
                        <circle cx={m.cx} cy={m.cy} r="9" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.4"/>
                        <text x={m.cx} y={m.cy + 15} textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">Global Min</text>
                      </g>
                    );
                  })()}

                  {/* History trail */}
                  {history3D.length > 1 && !exploded && (
                    <polyline
                      points={history3D.map(p => {
                        const pr = project3D(p.x, getLoss3D(p.x, p.z), p.z);
                        return `${pr.cx.toFixed(1)},${pr.cy.toFixed(1)}`;
                      }).join(' ')}
                      fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7"
                    />
                  )}

                  {/* Tangent Plane */}
                  {!exploded && (() => {
                    const pp = getTangentPlanePoints();
                    if (!pp) return null;
                    return <polygon points={pp} fill="rgba(99,102,241,0.12)" stroke="rgba(129,140,248,0.7)" strokeWidth="1"/>;
                  })()}

                  {/* Normal + Descent vectors */}
                  {!exploded && (() => {
                    const { x, z } = pos3D;
                    const y = getLoss3D(x, z);
                    const { dx, dz } = getGradient3D(x, z);
                    if (Math.abs(dx) < 0.1 && Math.abs(dz) < 0.1) return null;

                    const base = project3D(x, y, z);

                    // ── NORMAL VECTOR: N = (-Lx, 1, -Lz) ──
                    // The surface is F(x,y,z) = L(x,z) - y = 0.
                    // ∇F = (Lx, -1, Lz), so inward normal = (Lx, -1, Lz).
                    // Outward (away from surface, toward higher y) = (-Lx, 1, -Lz).
                    // CRITICAL: normalize first so the arrow always protrudes at
                    // a consistent length regardless of gradient magnitude.
                    const nRaw = { x: -dx, y: 1, z: -dz };
                    const nLen = Math.sqrt(nRaw.x ** 2 + nRaw.y ** 2 + nRaw.z ** 2);
                    const nWorldLen = 14.0;
                    const ns = nWorldLen / nLen;
                    const pN = project3D(x + nRaw.x * ns, y + nRaw.y * ns, z + nRaw.z * ns);

                    // ── STEEPEST DESCENT ON TANGENT PLANE: V = (-Lx, -(Lx²+Lz²), -Lz) ──
                    // Verify N·V = (-Lx)(-Lx) + (1)(-(Lx²+Lz²)) + (-Lz)(-Lz)
                    //            = Lx² - Lx² - Lz² + Lz² = 0  ✓  always orthogonal!
                    // This vector lies IN the tangent plane and moves toward lower loss.
                    const dy2 = -(dx * dx + dz * dz);
                    const vRaw = { x: -dx, y: dy2, z: -dz };
                    const vLen = Math.sqrt(vRaw.x ** 2 + vRaw.y ** 2 + vRaw.z ** 2);
                    const vWorldLen = 14.0;
                    const vs = vWorldLen / Math.max(vLen, 0.01);
                    const pD = project3D(x + vRaw.x * vs, y + vRaw.y * vs, z + vRaw.z * vs);

                    // Right-angle mark: 22% along each arrow from base (screen-space)
                    const f = 0.22;
                    const nP = { cx: base.cx + (pN.cx - base.cx) * f, cy: base.cy + (pN.cy - base.cy) * f };
                    const dP = { cx: base.cx + (pD.cx - base.cx) * f, cy: base.cy + (pD.cy - base.cy) * f };
                    const corner = { cx: nP.cx + dP.cx - base.cx, cy: nP.cy + dP.cy - base.cy };

                    return (
                      <g>
                        {/* Normal vector — protrudes perpendicularly from surface */}
                        <line x1={base.cx} y1={base.cy} x2={pN.cx} y2={pN.cy} stroke="#f472b6" strokeWidth="2.5" markerEnd="url(#mn)"/>
                        <text x={pN.cx} y={pN.cy - 11} textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold" opacity="0.9">n (법선벡터)</text>

                        {/* Descent vector — lies on tangent plane toward lower loss */}
                        <line x1={base.cx} y1={base.cy} x2={pD.cx} y2={pD.cy} stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#md)"/>
                        <text x={pD.cx} y={pD.cy + 14} textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold" opacity="0.9">-∇L (경사하강)</text>

                        {/* 90° right-angle mark */}
                        <polyline
                          points={`${nP.cx.toFixed(1)},${nP.cy.toFixed(1)} ${corner.cx.toFixed(1)},${corner.cy.toFixed(1)} ${dP.cx.toFixed(1)},${dP.cy.toFixed(1)}`}
                          fill="none" stroke="#fbbf24" strokeWidth="1.3"
                        />
                      </g>
                    );
                  })()}

                  {/* Current ball — on top */}
                  {!exploded && (() => {
                    const bp = project3D(pos3D.x, getLoss3D(pos3D.x, pos3D.z), pos3D.z);
                    return (
                      <g>
                        <circle cx={bp.cx} cy={bp.cy} r="11" fill="#f59e0b" opacity="0.15"/>
                        <circle cx={bp.cx} cy={bp.cy} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="1.8"/>
                      </g>
                    );
                  })()}
                </g>
              </svg>
            </div>

          ) : (
            /* ══ 2D VIEW ══ */
            <svg
              viewBox={`${pan2D.x} ${pan2D.y} ${420 / zoom2D} ${300 / zoom2D}`}
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              style={{ display: 'block', cursor: dragMode.current === 'pan2d' ? 'grabbing' : 'default' }}
              onMouseDown={handleMouseDown2D}
              onMouseMove={handleMouseMove2D}
              onMouseUp={handleMouseUp2D}
              onMouseLeave={handleMouseUp2D}
              onWheel={handleWheel2D}
              onContextMenu={e => e.preventDefault()}
            >
              <defs>
                {/* No clipPath here — outer div overflow:hidden handles clipping */}
                <marker id="ag" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
                  <polygon points="0 0,5 2.5,0 5" fill="#ef4444"/>
                </marker>
                <marker id="as" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
                  <polygon points="0 0,5 2.5,0 5" fill="#fbbf24"/>
                </marker>
              </defs>
              <g>
                {/* Min guide */}
                <line
                  x1={landscape === 'simple' ? 200 : 86} y1="20"
                  x2={landscape === 'simple' ? 200 : 86} y2="290"
                  stroke="#334155" strokeWidth="1" strokeDasharray="4 3"
                />
                <text x={(landscape === 'simple' ? 200 : 86) + 3} y="34" fill="#475569" fontSize="8" fontWeight="bold">Min</text>

                {/* Loss curve */}
                <polyline
                  points={curvePoints}
                  fill="none"
                  stroke={landscape === 'simple' ? '#3b82f6' : '#a855f7'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* History trail */}
                {history.length > 1 && !exploded && (
                  <polyline
                    points={history.map(hx => `${hx},${getSVG_Y(hx)}`).join(' ')}
                    fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4 3" markerEnd="url(#as)" opacity="0.8"
                  />
                )}

                {/* Tangent line */}
                {!exploded && (() => {
                  const g = getGradient(position);
                  const len = 45;
                  const norm = Math.sqrt(1 + g * g);
                  const ddx = len / norm;
                  const ddy = len * (-g) / norm;
                  return <line x1={position - ddx} y1={getSVG_Y(position) - ddy} x2={position + ddx} y2={getSVG_Y(position) + ddy} stroke="#6366f1" strokeWidth="1.6" opacity="0.6"/>;
                })()}

                {/* Current ball */}
                {!exploded && (
                  <g>
                    <circle cx={position} cy={getSVG_Y(position)} r="13" fill="#f59e0b" opacity="0.12"/>
                    <circle cx={position} cy={getSVG_Y(position)} r="7" fill="#f59e0b" stroke="#fff" strokeWidth="2"/>
                  </g>
                )}

                {/* Gradient arrow */}
                {!exploded && Math.abs(getGradient(position)) > 0.05 && (() => {
                  const g = getGradient(position);
                  const ex = position - Math.sign(g) * 32;
                  const ey = getSVG_Y(position) - Math.abs(g) * 6;
                  return <line x1={position} y1={getSVG_Y(position)} x2={ex} y2={ey} stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#ag)"/>;
                })()}
              </g>
            </svg>
          )}
        </div>

        {/* Action Bar */}
        <div className="px-6 py-4 flex justify-center gap-4 shrink-0 border-t border-white/10 bg-black/20">
          <button
            onClick={takeStep}
            disabled={exploded || (landscape === '3d_complex'
              ? (Math.abs(getGradient3D(pos3D.x, pos3D.z).dx) < 0.05 && Math.abs(getGradient3D(pos3D.x, pos3D.z).dz) < 0.05)
              : (Math.abs(position - (landscape === 'simple' ? 200 : 86)) < 1))}
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 text-white rounded-full font-black text-sm shadow-[0_0_18px_rgba(245,158,11,0.4)] transition-all hover:scale-105 active:scale-95 disabled:shadow-none flex items-center gap-2 border border-white/10"
          >
            <Move size={15}/> 1 Step 이동
          </button>
          <button
            onClick={reset}
            className="px-7 py-3 bg-white/5 hover:bg-white/12 text-white text-sm rounded-full font-semibold transition-all border border-white/10"
          >
            초기화
          </button>
          {/* Zoom reset buttons */}
          {landscape === '3d_complex' && (zoom3D !== 1 || pan3D.x !== 0 || pan3D.y !== 0) && (
            <button
              onClick={() => { setZoom3D(1); setPan3D({ x: 0, y: 0 }); }}
              className="px-5 py-3 bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 text-xs rounded-full font-bold transition-all border border-indigo-500/20"
            >
              뷰 초기화
            </button>
          )}
          {landscape !== '3d_complex' && (zoom2D !== 1 || pan2D.x !== 0 || pan2D.y !== 0) && (
            <button
              onClick={() => { setZoom2D(1); setPan2D({ x: 0, y: 0 }); }}
              className="px-5 py-3 bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 text-xs rounded-full font-bold transition-all border border-blue-500/20"
            >
              뷰 초기화
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
