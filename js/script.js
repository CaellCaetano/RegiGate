// ===== THEME =====
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('ugb_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ugb_theme', next);
  }
};

// ===== AUTH =====
const Auth = {
  isLoggedIn() {
    return !!localStorage.getItem('ugb_token');
  },
  login(email, senha) {
    // Mock: aceita qualquer login válido
    if (email && senha.length >= 4) {
      localStorage.setItem('ugb_token', 'mock_token_123');
      localStorage.setItem('ugb_user', JSON.stringify({ nome: 'Admin UGB', email, cargo: 'Administrador' }));
      return true;
    }
    return false;
  },
  logout() {
    localStorage.removeItem('ugb_token');
    localStorage.removeItem('ugb_user');
    window.location.href = getBasePath() + 'index.html';
  },
  getUser() {
    const u = localStorage.getItem('ugb_user');
    return u ? JSON.parse(u) : { nome: 'Admin', email: 'admin@ugb.edu.br', cargo: 'Administrador' };
  },
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = getBasePath() + 'index.html';
    }
  }
};

function getBasePath() {
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../' : './';
}

// ===== MOCK DATA =====
const MockData = {
  veiculos: [
    { id: 1, placa: 'RJC-2024', modelo: 'Toyota Corolla', cor: 'Prata', proprietario: 'Carlos Mendes', matricula: '20240001', status: 'estacionado', entrada: '2026-06-09T08:15:00' },
    { id: 2, placa: 'RJA-5590', modelo: 'Honda Civic', cor: 'Preto', proprietario: 'Ana Lima', matricula: '20230145', status: 'fora', entrada: null },
    { id: 3, placa: 'RJB-1337', modelo: 'Volkswagen Gol', cor: 'Branco', proprietario: 'Marcos Souza', matricula: '20220310', status: 'estacionado', entrada: '2026-06-09T09:30:00' },
    { id: 4, placa: 'RJD-8821', modelo: 'Fiat Uno', cor: 'Azul', proprietario: 'Beatriz Costa', matricula: '20240088', status: 'fora', entrada: null },
    { id: 5, placa: 'RJE-4412', modelo: 'Chevrolet Onix', cor: 'Vermelho', proprietario: 'Lucas Ferreira', matricula: '20230567', status: 'estacionado', entrada: '2026-06-09T07:45:00' },
    { id: 6, placa: 'RJF-9901', modelo: 'Renault Kwid', cor: 'Cinza', proprietario: 'Fernanda Oliveira', matricula: '20240212', status: 'fora', entrada: null },
    { id: 7, placa: 'RJG-3344', modelo: 'Jeep Renegade', cor: 'Verde', proprietario: 'Roberto Nunes', matricula: '20210099', status: 'estacionado', entrada: '2026-06-09T10:00:00' },
    { id: 8, placa: 'RJH-7782', modelo: 'Ford Ka', cor: 'Amarelo', proprietario: 'Priscila Alves', matricula: '20220780', status: 'fora', entrada: null },
  ],

  movimentacoes: [
    { id: 1, tipo: 'entrada', placa: 'RJC-2024', horario: '2026-06-03T08:15:00', imagem: null, tempo: null },
    { id: 2, tipo: 'entrada', placa: 'RJB-1337', horario: '2026-06-03T09:30:00', imagem: null, tempo: null },
    { id: 3, tipo: 'saida', placa: 'RJA-5590', horario: '2026-06-03T09:45:00', imagem: null, tempo: '1h 20min' },
    { id: 4, tipo: 'entrada', placa: 'RJE-4412', horario: '2026-06-03T07:45:00', imagem: null, tempo: null },
    { id: 5, tipo: 'saida', placa: 'RJD-8821', horario: '2026-06-03T08:50:00', imagem: null, tempo: '45min' },
    { id: 6, tipo: 'entrada', placa: 'RJG-3344', horario: '2026-06-03T10:00:00', imagem: null, tempo: null },
    { id: 7, tipo: 'saida', placa: 'RJF-9901', horario: '2026-06-03T10:15:00', imagem: null, tempo: '2h 05min' },
    { id: 8, tipo: 'entrada', placa: 'RJH-7782', horario: '2026-06-02T14:20:00', imagem: null, tempo: null },
    { id: 9, tipo: 'saida', placa: 'RJH-7782', horario: '2026-06-02T17:00:00', imagem: null, tempo: '2h 40min' },
    { id: 10, tipo: 'entrada', placa: 'RJC-2024', horario: '2026-06-02T08:00:00', imagem: null, tempo: null },
    { id: 11, tipo: 'saida', placa: 'RJC-2024', horario: '2026-06-02T12:30:00', imagem: null, tempo: '4h 30min' },
  ],

  usuarios: [
    { id: 1, nome: 'Admin UGB', email: 'admin@ugb.edu.br', matricula: '99999', cargo: 'Administrador', nivel: 'admin', status: 'ativo' },
    { id: 2, nome: 'João Porteiro', email: 'joao.porteiro@ugb.edu.br', matricula: '10001', cargo: 'Porteiro', nivel: 'operador', status: 'ativo' },
    { id: 3, nome: 'Maria Supervisora', email: 'maria.super@ugb.edu.br', matricula: '10002', cargo: 'Supervisora', nivel: 'supervisor', status: 'ativo' },
    { id: 4, nome: 'Pedro Operador', email: 'pedro.op@ugb.edu.br', matricula: '10003', cargo: 'Operador', nivel: 'operador', status: 'inativo' },
  ],

  totalVagas: 50,

  getStats() {
    const estacionados = this.veiculos.filter(v => v.status === 'estacionado').length;
    const hoje = new Date().toDateString();
    const entradasHoje = this.movimentacoes.filter(m => m.tipo === 'entrada' && new Date(m.horario).toDateString() === hoje).length;
    const saidasHoje = this.movimentacoes.filter(m => m.tipo === 'saida' && new Date(m.horario).toDateString() === hoje).length;
    return {
      estacionados,
      entradasHoje,
      saidasHoje,
      vagasDisponiveis: this.totalVagas - estacionados,
      totalVagas: this.totalVagas
    };
  }
};

// ===== UTILS =====
const Utils = {
  formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  },
  formatTime(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  },
  formatDateTime(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  },
  calcPermanencia(entradaStr) {
    if (!entradaStr) return '—';
    const entrada = new Date(entradaStr);
    const agora = new Date();
    const diff = Math.floor((agora - entrada) / 60000);
    if (diff < 60) return `${diff}min`;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  },
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  validatePlaca(placa) {
    return /^[A-Z]{3}-\d{4}$/.test(placa.toUpperCase());
  },
  exportCSV(data, filename) {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const header = keys.join(',');
    const rows = data.map(row => keys.map(k => `"${row[k] ?? ''}"`).join(','));
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
};

// ===== TOAST =====
const Toast = {
  container: null,
  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  show(message, type = 'info', duration = 3500) {
    if (!this.container) this.init();
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fas ${icons[type]} toast-icon"></i>
      <span class="toast-text">${message}</span>
      <i class="fas fa-times toast-close" onclick="this.parentElement.remove()"></i>
    `;
    this.container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  success(msg) { this.show(msg, 'success'); },
  error(msg) { this.show(msg, 'error'); },
  warning(msg) { this.show(msg, 'warning'); },
  info(msg) { this.show(msg, 'info'); }
};

// ===== SIDEBAR =====
const Sidebar = {
  init() {
    const toggle = document.getElementById('menu-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    if (toggle) {
      toggle.addEventListener('click', () => {
        document.querySelector('.sidebar')?.classList.toggle('open');
        overlay?.classList.toggle('open');
      });
    }
    if (overlay) {
      overlay.addEventListener('click', () => {
        document.querySelector('.sidebar')?.classList.remove('open');
        overlay.classList.remove('open');
      });
    }
    // Mark active nav item
    const current = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href && href.includes(current)) item.classList.add('active');
    });
    // Set user info
    const user = Auth.getUser();
    const nameEl = document.getElementById('sidebar-user-name');
    const roleEl = document.getElementById('sidebar-user-role');
    const avatarEl = document.getElementById('sidebar-avatar');
    if (nameEl) nameEl.textContent = user.nome;
    if (roleEl) roleEl.textContent = user.cargo;
    if (avatarEl) avatarEl.textContent = user.nome.charAt(0).toUpperCase();
  }
};

// ===== SIDEBAR HTML =====
function renderSidebar(activeItem) {
  const basePath = getBasePath();
  return `
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">
          <img src="../logo.png" alt="RegiGate" style="width:28px; height:28px; object-fit:contain;">
        </div>
        <div class="logo-text">RegiGate<span>Painel Administrativo</span></div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-label">Principal</div>
        <a href="${basePath}pages/dashboard.html" class="nav-item ${activeItem==='dashboard'?'active':''}">
          <i class="fas fa-chart-line"></i> Dashboard
        </a>
        <a href="${basePath}pages/movimentacoes.html" class="nav-item ${activeItem==='movimentacoes'?'active':''}">
          <i class="fas fa-exchange-alt"></i> Controle de Entradas/Saídas
        </a>
        <div class="nav-section-label">Gestão</div>
        <a href="${basePath}pages/veiculos.html" class="nav-item ${activeItem==='veiculos'?'active':''}">
          <i class="fas fa-car"></i> Controle de Veículos
        </a>
        <a href="${basePath}pages/relatorios.html" class="nav-item ${activeItem==='relatorios'?'active':''}">
          <i class="fas fa-file-alt"></i> Relatórios Operacionais
        </a>
        <a href="${basePath}pages/usuarios.html" class="nav-item ${activeItem==='usuarios'?'active':''}">
          <i class="fas fa-users"></i> Gestão de Usuários
        </a>
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="user-avatar" id="sidebar-avatar">A</div>
          <div class="user-info">
            <div class="name" id="sidebar-user-name">Admin</div>
            <div class="role" id="sidebar-user-role">Administrador</div>
          </div>
          <button class="icon-btn" onclick="Auth.logout()" title="Sair" style="background:transparent;border:none;">
            <i class="fas fa-sign-out-alt" style="color:rgba(255,255,255,0.4);"></i>
          </button>
        </div>
      </div>
    </aside>
  `;
}

// ===== TOPBAR HTML =====
function renderTopbar(title, subtitle) {
  return `
    <header class="topbar">
      <div class="topbar-left flex gap-8">
        <button class="menu-toggle" id="menu-toggle"><i class="fas fa-bars"></i></button>
        <div>
          <div class="page-title">${title}</div>
          ${subtitle ? `<div class="page-subtitle">${subtitle}</div>` : ''}
        </div>
      </div>
      <div class="topbar-right">
        <span class="toggle-label" id="theme-label">🌙</span>
        <div class="theme-toggle" id="theme-toggle" title="Alternar tema"></div>
      </div>
    </header>
  `;
}

// ===== INIT GLOBAL =====
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Toast.init();

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      ThemeManager.toggle();
      const label = document.getElementById('theme-label');
      if (label) label.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
    });
    const label = document.getElementById('theme-label');
    if (label) label.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
  }

  Sidebar.init();
});
