<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220323075830 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE infirmier DROP FOREIGN KEY FK_BFEC55B94DDCCFA3');
        $this->addSql('DROP INDEX IDX_BFEC55B94DDCCFA3 ON infirmier');
        $this->addSql('ALTER TABLE infirmier DROP vaccination_id');
        $this->addSql('ALTER TABLE patient DROP FOREIGN KEY FK_1ADAD7EB4DDCCFA3');
        $this->addSql('DROP INDEX IDX_1ADAD7EB4DDCCFA3 ON patient');
        $this->addSql('ALTER TABLE patient DROP vaccination_id');
        $this->addSql('ALTER TABLE vaccin_type DROP FOREIGN KEY FK_43B6EB189B14AC76');
        $this->addSql('DROP INDEX IDX_43B6EB189B14AC76 ON vaccin_type');
        $this->addSql('ALTER TABLE vaccin_type DROP vaccin_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE infirmier ADD vaccination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE infirmier ADD CONSTRAINT FK_BFEC55B94DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id)');
        $this->addSql('CREATE INDEX IDX_BFEC55B94DDCCFA3 ON infirmier (vaccination_id)');
        $this->addSql('ALTER TABLE patient ADD vaccination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE patient ADD CONSTRAINT FK_1ADAD7EB4DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id)');
        $this->addSql('CREATE INDEX IDX_1ADAD7EB4DDCCFA3 ON patient (vaccination_id)');
        $this->addSql('ALTER TABLE vaccin_type ADD vaccin_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE vaccin_type ADD CONSTRAINT FK_43B6EB189B14AC76 FOREIGN KEY (vaccin_id) REFERENCES vaccin (id)');
        $this->addSql('CREATE INDEX IDX_43B6EB189B14AC76 ON vaccin_type (vaccin_id)');
    }
}
