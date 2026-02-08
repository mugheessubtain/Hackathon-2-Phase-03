# ===============================
# FastAPI Backend for HF Spaces
# ===============================

FROM python:3.11-slim

# -------------------------------
# Environment variables
# -------------------------------
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PYTHONPATH=/app

# -------------------------------
# Set working directory
# -------------------------------
WORKDIR /app

# -------------------------------
# Install system dependencies
# -------------------------------
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    python3-dev \
    libffi-dev \
    libpq-dev \
    postgresql-client \
    curl \
    && rm -rf /var/lib/apt/lists/*

# -------------------------------
# Upgrade pip tooling
# -------------------------------
RUN pip install --upgrade pip setuptools wheel

# -------------------------------
# Install Python dependencies
# -------------------------------
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# -------------------------------
# Copy application source
# -------------------------------
COPY . .

# -------------------------------
# Create runtime directories
# -------------------------------
RUN mkdir -p logs

# -------------------------------
# Expose HF Spaces port
# -------------------------------
EXPOSE 7860

# -------------------------------
# Healthcheck (HF-friendly)
# -------------------------------
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:7860/api/v1/health || exit 1

# -------------------------------
# Run FastAPI
# -------------------------------
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]