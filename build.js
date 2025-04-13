/**
 * Design System Build Script
 * 이 스크립트는 디자인 시스템 패키지를 순서대로 빌드하는 프로세스를 자동화합니다.
 */

const { execSync } = require("child_process");
const path = require("path");

// 로그 유틸리티
const log = {
  info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
  warn: (msg) => console.log(`\x1b[33m[WARNING]\x1b[0m ${msg}`),
  error: (msg) => console.log(`\x1b[31m[ERROR]\x1b[0m ${msg}`),
};

// 빌드 실행 함수
function runBuild() {
  try {
    log.info("디자인 시스템 빌드 프로세스 시작...");
    const startTime = Date.now();

    // 1. 이전 빌드 정리
    log.info("이전 빌드 폴더 정리 중...");
    execSync("npm run prebuild", { stdio: "inherit" });

    // 2. packages 빌드
    log.info("디자인 시스템 패키지 빌드 중...");
    execSync("npm run build:packages", { stdio: "inherit" });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    log.success(`디자인 시스템 빌드 완료 (소요 시간: ${duration}초)`);
  } catch (error) {
    log.error(`빌드 중 오류 발생: ${error.message}`);
    process.exit(1);
  }
}

// 빌드 실행
runBuild();
